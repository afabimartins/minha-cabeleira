import {
  jsPDF,
} from "jspdf";

import brandMarkUrl from "../assets/minha-cabeleira-logo-mark.png";

import type {
  AnalysisReport,
} from "./analysis-report-model";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN_X = 16;
const MARGIN_BOTTOM = 16;
const CONTENT_WIDTH =
  PAGE_WIDTH - MARGIN_X * 2;

const COLORS = {
  ink: "#201715",
  softText: "#715F59",
  coral: "#F25F46",
  orange: "#F29B42",
  purple: "#7E58C7",
  green: "#2F8A64",
  warning: "#C37A1F",
  danger: "#BF3F56",
  cream: "#FFF8F2",
  white: "#FFFFFF",
  peach: "#FFF0E7",
  mint: "#EEF8F2",
  lavender: "#F5EFFF",
  border: "#EFDCD1",
};

type PdfContext = {
  pdf: jsPDF;
  y: number;
  pageNumber: number;
  brandImage: HTMLImageElement | null;
};

type TextOptions = {
  x?: number;
  width?: number;
  fontSize?: number;
  lineHeight?: number;
  bold?: boolean;
  color?: string;
  spacingAfter?: number;
};

type ReportWithRoutineGuidance =
  AnalysisReport & {
    routineGuidance?: Array<{
      title: string;
      description: string;
    }>;
  };

function setTextColor(
  pdf: jsPDF,
  color: string,
): void {
  pdf.setTextColor(color);
}

function setFillColor(
  pdf: jsPDF,
  color: string,
): void {
  pdf.setFillColor(color);
}

function setDrawColor(
  pdf: jsPDF,
  color: string,
): void {
  pdf.setDrawColor(color);
}

function loadBrandImage(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = brandMarkUrl;
  });
}

function drawBrandMark(
  context: PdfContext,
  x: number,
  y: number,
  scale = 1,
): void {
  if (!context.brandImage) {
    return;
  }

  const size = 32 * scale;

  context.pdf.addImage(
    context.brandImage,
    "PNG",
    x,
    y,
    size,
    size,
    undefined,
    "FAST",
  );
}

function drawPageBackground(
  context: PdfContext,
): void {
  const { pdf } = context;

  setFillColor(pdf, COLORS.cream);
  pdf.rect(
    0,
    0,
    PAGE_WIDTH,
    PAGE_HEIGHT,
    "F",
  );

  setFillColor(pdf, "#FFE8DA");
  pdf.circle(194, 6, 28, "F");

  setDrawColor(pdf, "#F5C6A7");
  pdf.setLineWidth(0.35);
  pdf.lines(
    [
      [20, 4, 27, 12, 36, 13],
      [16, 4, 23, 12, 31, 15],
    ],
    164,
    12,
    [1, 1],
    "S",
    false,
  );

  setFillColor(pdf, "#FFE2D5");
  pdf.circle(2, 294, 20, "F");
}

function drawFooterBrand(
  context: PdfContext,
): void {
  const { pdf } = context;
  const y = 282;

  setDrawColor(pdf, "#F3C7AF");
  pdf.setLineWidth(0.35);
  pdf.line(54, y - 4, 197, y - 4);

  drawBrandMark(
    context,
    161,
    y - 2,
    0.48,
  );

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setTextColor(pdf, COLORS.ink);
  pdf.text(
    "Minha Cabeleira",
    179,
    y + 3,
  );

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(4.8);
  setTextColor(pdf, COLORS.softText);
  pdf.text(
    "CUIDADO SEM RÓTULOS",
    179,
    y + 7,
  );

  pdf.setFontSize(6);
  setTextColor(pdf, "#9A8178");
  pdf.text(
    `${context.pageNumber}`,
    16,
    y + 7,
  );
}

function startContinuationPage(
  context: PdfContext,
): void {
  context.pdf.addPage();
  context.pageNumber += 1;
  drawPageBackground(context);

  drawBrandMark(
    context,
    16,
    11,
    0.62,
  );

  context.pdf.setFont(
    "helvetica",
    "bold",
  );
  context.pdf.setFontSize(10);
  setTextColor(
    context.pdf,
    COLORS.ink,
  );
  context.pdf.text(
    "Minha Cabeleira",
    39,
    20,
  );

  context.pdf.setFontSize(5.8);
  setTextColor(
    context.pdf,
    COLORS.softText,
  );
  context.pdf.text(
    "CONTINUAÇÃO DO RELATÓRIO",
    39,
    24,
  );

  context.y = 34;
}

function ensureSpace(
  context: PdfContext,
  requiredHeight: number,
): void {
  if (
    context.y + requiredHeight >
    PAGE_HEIGHT - MARGIN_BOTTOM - 15
  ) {
    drawFooterBrand(context);
    startContinuationPage(
      context,
    );
  }
}

function splitLines(
  context: PdfContext,
  text: string,
  width: number,
  fontSize: number,
  bold = false,
): string[] {
  context.pdf.setFont(
    "helvetica",
    bold ? "bold" : "normal",
  );
  context.pdf.setFontSize(fontSize);

  return context.pdf.splitTextToSize(
    text,
    width,
  ) as string[];
}

function measureText(
  context: PdfContext,
  text: string,
  options?: TextOptions,
): number {
  const width =
    options?.width ?? CONTENT_WIDTH;
  const fontSize =
    options?.fontSize ?? 9.5;
  const lineHeight =
    options?.lineHeight ?? 4.8;

  return (
    splitLines(
      context,
      text,
      width,
      fontSize,
      options?.bold,
    ).length * lineHeight
  );
}

function addText(
  context: PdfContext,
  text: string,
  options?: TextOptions,
): void {
  const x =
    options?.x ?? MARGIN_X;
  const width =
    options?.width ?? CONTENT_WIDTH;
  const fontSize =
    options?.fontSize ?? 9.5;
  const lineHeight =
    options?.lineHeight ?? 4.8;
  const spacingAfter =
    options?.spacingAfter ?? 2.5;
  const color =
    options?.color ?? COLORS.ink;

  const lines = splitLines(
    context,
    text,
    width,
    fontSize,
    options?.bold,
  );

  const height =
    lines.length * lineHeight;

  ensureSpace(
    context,
    height + spacingAfter,
  );

  context.pdf.setFont(
    "helvetica",
    options?.bold ? "bold" : "normal",
  );
  context.pdf.setFontSize(fontSize);
  setTextColor(
    context.pdf,
    color,
  );
  context.pdf.text(
    lines,
    x,
    context.y,
  );

  context.y +=
    height + spacingAfter;
}

function addSectionHeader(
  context: PdfContext,
  number: string,
  eyebrow: string,
  title: string,
  color: string,
  background: string,
): void {
  ensureSpace(context, 25);

  const y = context.y;

  setFillColor(
    context.pdf,
    background,
  );
  context.pdf.roundedRect(
    12,
    y - 5,
    186,
    22,
    4,
    4,
    "F",
  );

  // Small section badge instead of a large circular marker.
  // Using only vector shapes and ASCII digits avoids glyph issues in jsPDF.
  setFillColor(
    context.pdf,
    color,
  );
  context.pdf.roundedRect(
    17,
    y - 0.5,
    14,
    7.5,
    2.2,
    2.2,
    "F",
  );

  context.pdf.setFont(
    "helvetica",
    "bold",
  );
  context.pdf.setFontSize(7.2);
  setTextColor(
    context.pdf,
    COLORS.white,
  );
  context.pdf.text(
    number,
    24,
    y + 4.5,
    {
      align: "center",
    },
  );

  context.pdf.setFontSize(6.2);
  setTextColor(
    context.pdf,
    color,
  );
  context.pdf.text(
    eyebrow.toUpperCase(),
    36,
    y + 1,
  );

  context.pdf.setFontSize(14.2);
  setTextColor(
    context.pdf,
    COLORS.ink,
  );
  context.pdf.text(
    title,
    36,
    y + 8.5,
  );

  context.y += 23;
}

function addFindingCard(
  context: PdfContext,
  title: string,
  description: string,
): void {
  const innerWidth = 157;
  const titleHeight = measureText(
    context,
    title,
    {
      width: innerWidth,
      fontSize: 10.5,
      lineHeight: 4.8,
      bold: true,
    },
  );
  const descriptionHeight =
    measureText(
      context,
      description,
      {
        width: innerWidth,
        fontSize: 8.7,
        lineHeight: 4.5,
      },
    );
  const cardHeight =
    11 + titleHeight +
    descriptionHeight + 8;

  ensureSpace(
    context,
    cardHeight + 5,
  );

  const y = context.y;

  setFillColor(
    context.pdf,
    COLORS.white,
  );
  setDrawColor(
    context.pdf,
    "#F2DED4",
  );
  context.pdf.roundedRect(
    16,
    y,
    178,
    cardHeight,
    4,
    4,
    "FD",
  );

  // A slim vector accent replaces the oversized circle + bullet.
  setFillColor(
    context.pdf,
    COLORS.coral,
  );
  context.pdf.roundedRect(
    22,
    y + 7,
    1.5,
    Math.max(8, cardHeight - 14),
    0.7,
    0.7,
    "F",
  );

  context.y = y + 10;
  addText(context, title, {
    x: 29,
    width: innerWidth,
    fontSize: 10.5,
    lineHeight: 4.8,
    bold: true,
    spacingAfter: 1,
  });
  addText(
    context,
    description,
    {
      x: 29,
      width: innerWidth,
      fontSize: 8.7,
      lineHeight: 4.5,
      color: COLORS.softText,
      spacingAfter: 0,
    },
  );

  context.y = y + cardHeight + 5;
}

function addFindingSection(
  context: PdfContext,
  report: AnalysisReport,
): void {
  addSectionHeader(
    context,
    "01",
    "Seu cabelo",
    "O que observamos no seu cabelo",
    COLORS.coral,
    COLORS.peach,
  );

  if (report.findings.length === 0) {
    addFindingCard(
      context,
      "Sem padrão específico destacado",
      "Ainda não encontramos evidências suficientes para destacar um padrão específico a partir das respostas fornecidas.",
    );
    return;
  }

  report.findings.forEach(
    (finding) => {
      addFindingCard(
        context,
        finding.title,
        finding.description,
      );
    },
  );
}

function getSafetyColors(
  level: AnalysisReport["safety"]["level"],
): {
  accent: string;
  background: string;
  inner: string;
} {
  if (level === "stop") {
    return {
      accent: COLORS.danger,
      background: "#FDEEF2",
      inner: "#FFF7F9",
    };
  }

  if (level === "caution") {
    return {
      accent: COLORS.warning,
      background: COLORS.mint,
      inner: "#FFF8EE",
    };
  }

  return {
    accent: COLORS.green,
    background: COLORS.mint,
    inner: "#F8FCF9",
  };
}

function addSafetySection(
  context: PdfContext,
  report: AnalysisReport,
): void {
  const colors = getSafetyColors(
    report.safety.level,
  );

  addSectionHeader(
    context,
    "02",
    "Cuidado",
    "Segurança",
    colors.accent,
    colors.background,
  );

  const textWidth = 158;
  const titleHeight = measureText(
    context,
    report.safety.title,
    {
      width: textWidth,
      fontSize: 10.6,
      lineHeight: 4.8,
      bold: true,
    },
  );
  const descriptionHeight =
    measureText(
      context,
      report.safety.description,
      {
        width: textWidth,
        fontSize: 8.7,
        lineHeight: 4.5,
      },
    );
  const noticesHeight =
    report.safety.notices.reduce(
      (total, notice) =>
        total +
        measureText(
          context,
          notice,
          {
            width: 155,
            fontSize: 8.2,
            lineHeight: 4.2,
          },
        ) + 4,
      0,
    );
  const cardHeight =
    12 + titleHeight +
    descriptionHeight +
    noticesHeight + 13;

  ensureSpace(
    context,
    cardHeight + 5,
  );

  const y = context.y;
  setFillColor(
    context.pdf,
    colors.inner,
  );
  setDrawColor(
    context.pdf,
    "#E7D9D0",
  );
  context.pdf.roundedRect(
    16,
    y,
    178,
    cardHeight,
    4,
    4,
    "FD",
  );

  // Status is indicated by color and a vector accent bar.
  // No Unicode checkmark/exclamation glyph is used in the PDF.
  setFillColor(
    context.pdf,
    colors.accent,
  );
  context.pdf.roundedRect(
    22,
    y + 7,
    1.5,
    Math.max(8, cardHeight - 14),
    0.7,
    0.7,
    "F",
  );

  context.y = y + 10;
  addText(
    context,
    report.safety.title,
    {
      x: 29,
      width: textWidth,
      fontSize: 10.6,
      lineHeight: 4.8,
      bold: true,
      spacingAfter: 1.5,
    },
  );
  addText(
    context,
    report.safety.description,
    {
      x: 29,
      width: textWidth,
      fontSize: 8.7,
      lineHeight: 4.5,
      color: COLORS.softText,
      spacingAfter: 4,
    },
  );

  if (
    report.safety.notices.length > 0
  ) {
    setDrawColor(
      context.pdf,
      "#E8DDD6",
    );
    context.pdf.line(
      22,
      context.y,
      188,
      context.y,
    );
    context.y += 5;

    report.safety.notices.forEach(
      (notice) => {
        setDrawColor(
          context.pdf,
          colors.accent,
        );
        context.pdf.setLineWidth(0.8);
        context.pdf.line(
          25,
          context.y - 1.5,
          29,
          context.y - 1.5,
        );
        addText(
          context,
          notice,
          {
            x: 33,
            width: 155,
            fontSize: 8.2,
            lineHeight: 4.2,
            color:
              COLORS.softText,
            spacingAfter: 2,
          },
        );
      },
    );
  }

  context.y = y + cardHeight + 6;
}

function addIngredientGuidance(
  context: PdfContext,
  recommendation:
    AnalysisReport["recommendations"][number],
): void {
  const guidance =
    recommendation.ingredientGuidance;

  if (
    recommendation
      .ingredientGuidanceBlocked
  ) {
    addText(
      context,
      "Orientação de fórmula pausada",
      {
        x: 23,
        width: 164,
        fontSize: 9.5,
        bold: true,
        spacingAfter: 1,
      },
    );
    addText(
      context,
      "Por segurança, as orientações de fórmula não são exibidas neste resultado.",
      {
        x: 23,
        width: 164,
        fontSize: 8.2,
        lineHeight: 4.2,
        color: COLORS.softText,
        spacingAfter: 5,
      },
    );
    return;
  }

  if (!guidance) {
    return;
  }

  addText(
    context,
    "ORIENTAÇÃO DE FÓRMULA",
    {
      x: 23,
      width: 164,
      fontSize: 6.2,
      bold: true,
      color: COLORS.purple,
      spacingAfter: 1.5,
    },
  );
  addText(
    context,
    "O que procurar na fórmula",
    {
      x: 23,
      width: 164,
      fontSize: 10.2,
      bold: true,
      spacingAfter: 1.5,
    },
  );
  addText(
    context,
    guidance.summary,
    {
      x: 23,
      width: 164,
      fontSize: 8.2,
      lineHeight: 4.2,
      color: COLORS.softText,
      spacingAfter: 4,
    },
  );

  guidance.lookFor.forEach(
    (item) => {
      const examples =
        item.examples
          .map(
            (example) =>
              example.inciName ??
              example.name,
          )
          .join(", ");
      const requiredHeight =
        measureText(
          context,
          item.name,
          {
            width: 158,
            fontSize: 9.1,
            bold: true,
          },
        ) +
        measureText(
          context,
          item.purpose,
          {
            width: 158,
            fontSize: 7.9,
            lineHeight: 4.1,
          },
        ) +
        (examples
          ? measureText(
              context,
              `Exemplos no rótulo: ${examples}`,
              {
                width: 158,
                fontSize: 7.5,
                lineHeight: 4,
              },
            )
          : 0) +
        9;

      ensureSpace(
        context,
        requiredHeight,
      );

      const startY = context.y;
      setFillColor(
        context.pdf,
        "#FFFCFA",
      );
      setDrawColor(
        context.pdf,
        "#EADFD9",
      );
      context.pdf.roundedRect(
        21,
        startY - 3,
        166,
        requiredHeight,
        3,
        3,
        "FD",
      );

      context.y = startY + 3;
      addText(
        context,
        item.name,
        {
          x: 25,
          width: 158,
          fontSize: 9.1,
          bold: true,
          spacingAfter: 1,
        },
      );
      addText(
        context,
        item.purpose,
        {
          x: 25,
          width: 158,
          fontSize: 7.9,
          lineHeight: 4.1,
          color:
            COLORS.softText,
          spacingAfter: 1.5,
        },
      );

      if (examples) {
        addText(
          context,
          `Exemplos no rótulo: ${examples}`,
          {
            x: 25,
            width: 158,
            fontSize: 7.5,
            lineHeight: 4,
            bold: true,
            color: COLORS.coral,
            spacingAfter: 0,
          },
        );
      }

      context.y =
        startY +
        requiredHeight + 2;
    },
  );

  addText(
    context,
    "A presença de um ingrediente isolado não garante o desempenho do produto. A formulação como um todo, a combinação dos componentes e o modo de uso também importam.",
    {
      x: 23,
      width: 164,
      fontSize: 7.2,
      lineHeight: 3.9,
      color: COLORS.softText,
      spacingAfter: 5,
    },
  );
}

type PdfRecommendationProduct =
  AnalysisReport["recommendations"][number]["products"][number];

function formatPdfProductPrice(
  product: PdfRecommendationProduct,
): string {
  if (product.price === undefined) {
    return "Preço não informado";
  }

  if (product.currency === "BRL") {
    return new Intl.NumberFormat(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      },
    ).format(product.price);
  }

  return `${product.currency ?? ""} ${product.price.toFixed(2)}`.trim();
}

function measureCompactProductCard(
  context: PdfContext,
  product: PdfRecommendationProduct,
  width: number,
): number {
  const title = `${product.name} · ${product.brand}`;
  const titleLines = splitLines(
    context,
    title,
    width - 10,
    7.5,
    true,
  );

  return Math.max(
    23,
    9 + titleLines.length * 3.9 + 7,
  );
}

function drawCompactProductCard(
  context: PdfContext,
  product: PdfRecommendationProduct,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const title = `${product.name} · ${product.brand}`;
  const titleLines = splitLines(
    context,
    title,
    width - 10,
    7.5,
    true,
  );

  setFillColor(
    context.pdf,
    "#F8FCF9",
  );
  context.pdf.roundedRect(
    x,
    y,
    width,
    height,
    3,
    3,
    "F",
  );

  context.pdf.setFont(
    "helvetica",
    "bold",
  );
  context.pdf.setFontSize(7.5);
  setTextColor(
    context.pdf,
    COLORS.ink,
  );
  context.pdf.text(
    titleLines,
    x + 5,
    y + 7,
  );

  const priceY =
    y + 7 + titleLines.length * 3.9 + 2;

  context.pdf.setFontSize(7.4);
  setTextColor(
    context.pdf,
    COLORS.green,
  );
  context.pdf.text(
    formatPdfProductPrice(product),
    x + 5,
    priceY,
  );
}

function addProducts(
  context: PdfContext,
  recommendation:
    AnalysisReport["recommendations"][number],
): void {
  if (
    recommendation.productsBlocked
  ) {
    addText(
      context,
      "Sugestões de produtos pausadas por segurança.",
      {
        x: 23,
        width: 164,
        fontSize: 8.2,
        bold: true,
        color: COLORS.warning,
        spacingAfter: 4,
      },
    );
    return;
  }

  if (
    recommendation.products.length ===
    0
  ) {
    addText(
      context,
      "Nenhum produto do catálogo atual atende aos critérios desta recomendação. Isso não altera a orientação de fórmula acima.",
      {
        x: 23,
        width: 164,
        fontSize: 7.8,
        lineHeight: 4,
        color: COLORS.softText,
        spacingAfter: 4,
      },
    );
    return;
  }

  addText(
    context,
    "PRODUTOS COMPATÍVEIS - CONSULTA OPCIONAL",
    {
      x: 23,
      width: 164,
      fontSize: 6.2,
      bold: true,
      color: COLORS.green,
      spacingAfter: 1.5,
    },
  );
  addText(
    context,
    "A marca não determina a recomendação técnica.",
    {
      x: 23,
      width: 164,
      fontSize: 7.5,
      color: COLORS.softText,
      spacingAfter: 3,
    },
  );

  // Grade compacta em duas colunas: mantém a consulta de produtos legível
  // sem empurrar poucos itens para uma página adicional quase vazia.
  const cardWidth = 80;
  const gap = 4;
  const leftX = 23;
  const rightX = leftX + cardWidth + gap;

  for (
    let index = 0;
    index < recommendation.products.length;
    index += 2
  ) {
    const leftProduct =
      recommendation.products[index];
    const rightProduct =
      recommendation.products[index + 1];

    const leftHeight =
      measureCompactProductCard(
        context,
        leftProduct,
        cardWidth,
      );
    const rightHeight = rightProduct
      ? measureCompactProductCard(
          context,
          rightProduct,
          cardWidth,
        )
      : 0;
    const rowHeight = Math.max(
      leftHeight,
      rightHeight,
    );

    ensureSpace(
      context,
      rowHeight + 4,
    );

    const rowY = context.y;

    drawCompactProductCard(
      context,
      leftProduct,
      leftX,
      rowY,
      cardWidth,
      rowHeight,
    );

    if (rightProduct) {
      drawCompactProductCard(
        context,
        rightProduct,
        rightX,
        rowY,
        cardWidth,
        rowHeight,
      );
    }

    context.y += rowHeight + 4;
  }
}



type PdfBaselinePriority = {
  title: string;
  description: string;
  actions: string[];
};

function getPdfBaselinePriority(
  report: ReportWithRoutineGuidance,
): PdfBaselinePriority {
  if (report.safety.level === "stop") {
    return {
      title: "Prioridade de segurança",
      description:
        "Algumas respostas pedem mais cautela antes de testar novos produtos ou tratamentos. Neste momento, a prioridade é preservar o couro cabeludo e buscar avaliação profissional quando indicado.",
      actions: [
        "Evite iniciar vários produtos ou procedimentos novos ao mesmo tempo.",
        "Mantenha apenas uma rotina essencial e confortável até o quadro estar esclarecido.",
        "Procure avaliação profissional se os sinais persistirem, piorarem ou forem intensos.",
      ],
    };
  }

  if (report.safety.level === "caution") {
    return {
      title: "Cuidar primeiro do couro cabeludo",
      description:
        "A análise encontrou um sinal que merece cautela. Antes de acrescentar novos ativos ou produtos, vale simplificar a rotina e observar como o couro cabeludo responde.",
      actions: [
        "Evite testar vários produtos novos de uma vez.",
        "Prefira uma rotina simples e interrompa o uso de algo que provoque desconforto.",
        "Se o sinal persistir ou ficar mais intenso, procure avaliação profissional.",
      ],
    };
  }

  const findingText = report.findings
    .map((finding) => `${finding.title} ${finding.description}`.toLowerCase())
    .join(" ");

  if (findingText.includes("calor")) {
    return {
      title: "Reduzir desgaste durante o uso de calor",
      description:
        "Você relatou exposição frequente ao calor. Isso, isoladamente, não significa que exista dano, mas justifica uma rotina mais cuidadosa sempre que secador, chapinha ou modelador forem usados.",
      actions: [
        "Use a menor temperatura que funcione para o resultado desejado.",
        "Evite concentrar calor por muito tempo no mesmo ponto ou repetir passadas sem necessidade.",
        "Observe se aumentam aspereza, embaraço ou quebra e ajuste a frequência se isso acontecer.",
      ],
    };
  }

  if (findingText.includes("quím")) {
    return {
      title: "Evitar sobreposição desnecessária de processos",
      description:
        "A exposição química relatada é relevante para o histórico do cabelo. Mesmo sem evidência suficiente para uma recomendação técnica específica, vale reduzir intervenções acumuladas e acompanhar a resposta da fibra.",
      actions: [
        "Evite repetir processos químicos antes de entender como o cabelo respondeu ao anterior.",
        "Dê atenção ao desembaraço e à manipulação gentil no comprimento.",
        "Observe mudanças de elasticidade, aspereza e quebra antes de aumentar a complexidade da rotina.",
      ],
    };
  }

  if (report.findings.length === 0) {
    return {
      title: "Manter uma rotina-base e observar respostas",
      description:
        "Suas respostas não concentraram evidências suficientes para apontar uma prioridade técnica única. O melhor ponto de partida é uma rotina simples que permita perceber com clareza como o cabelo responde.",
      actions: [
        "Mantenha limpeza compatível com o conforto do couro cabeludo.",
        "Condicione o comprimento sempre que houver mais aspereza ou embaraço.",
        "Evite aumentar a quantidade de etapas até identificar o que realmente melhora o cabelo.",
      ],
    };
  }

  return {
    title: "Consolidar uma rotina simples",
    description:
      "A análise registrou informações úteis, mas nenhuma delas, sozinha, sustenta uma recomendação técnica mais específica. A prioridade é manter a rotina previsível e observar respostas antes de adicionar novas etapas.",
    actions: [
      "Faça mudanças uma de cada vez para conseguir perceber o efeito de cada etapa.",
      "Priorize desembaraço e manipulação com pouco atrito.",
      "Reavalie a análise quando houver mudança importante na rotina ou no comportamento do cabelo.",
    ],
  };
}

function measureVectorActionList(
  context: PdfContext,
  actions: string[],
): number {
  return actions.reduce(
    (total, action) =>
      total +
      measureText(
        context,
        action,
        {
          width: 150,
          fontSize: 8.2,
          lineHeight: 4.2,
        },
      ) +
      2.2,
    0,
  );
}

function addVectorActionList(
  context: PdfContext,
  actions: string[],
): void {
  actions.forEach((action) => {
    const lines = splitLines(
      context,
      action,
      150,
      8.2,
      false,
    );

    const height =
      lines.length * 4.2;

    setDrawColor(
      context.pdf,
      COLORS.purple,
    );
    context.pdf.setLineWidth(0.75);
    context.pdf.line(
      27,
      context.y - 1.5,
      31,
      context.y - 1.5,
    );

    context.pdf.setFont(
      "helvetica",
      "normal",
    );
    context.pdf.setFontSize(8.2);
    setTextColor(
      context.pdf,
      COLORS.softText,
    );
    context.pdf.text(
      lines,
      35,
      context.y,
    );

    context.y += height + 2.2;
  });
}


function getRoutineCategoryLabel(
  category: string,
): string {
  switch (category) {
    case "shampoo":
      return "Shampoo";
    case "conditioner":
      return "Condicionador";
    case "mask":
      return "Máscara / tratamento";
    case "leave_in":
      return "Finalizador / creme / leave-in";
    case "oil":
      return "Óleo / sérum";
    case "scalp":
      return "Cuidado do couro cabeludo";
    default:
      return "Produto";
  }
}

function getRoutineMatchLabel(
  level: string,
): string {
  switch (level) {
    case "exact":
      return "correspondência alta";
    case "compatible":
      return "correspondência parcial";
    case "basic":
      return "opção básica da categoria";
    default:
      return "catálogo incompleto";
  }
}

function addRoutineProducts(
  context: PdfContext,
  report: ReportWithRoutineGuidance,
): void {
  if (!report.routineProducts?.length) {
    return;
  }

  addText(
    context,
    "PRODUTOS COMPATÍVEIS - CONSULTA OPCIONAL",
    {
      x: 20,
      width: 166,
      fontSize: 6.2,
      bold: true,
      color: COLORS.green,
      spacingAfter: 1.5,
    },
  );

  addText(
    context,
    "Depois da orientação de fórmula, reunimos até três opções por categoria, priorizando marcas diferentes para reduzir concentração comercial. A ordem segue compatibilidade técnica e não representa preferência de marca.",
    {
      x: 20,
      width: 166,
      fontSize: 7.7,
      lineHeight: 4,
      color: COLORS.softText,
      spacingAfter: 4,
    },
  );

  report.routineProducts.forEach(
    (selection) => {
      const categoryLabel =
        getRoutineCategoryLabel(
          selection.category,
        );

      const options =
        selection.options?.length
          ? selection.options
          : selection.product
            ? [
                {
                  product: selection.product,
                  matchLevel:
                    selection.matchLevel,
                  matchedAttributes:
                    selection.matchedAttributes,
                  missingAttributes:
                    selection.missingAttributes,
                },
              ]
            : [];

      if (options.length === 0) {
        addText(
          context,
          `${categoryLabel}: categoria sem produto ativo verificado no catálogo.`,
          {
            x: 23,
            width: 164,
            fontSize: 8,
            color: COLORS.warning,
            spacingAfter: 2.5,
          },
        );
        return;
      }

      addText(
        context,
        `${categoryLabel} — ${options.length} de ${selection.targetOptionCount ?? 3} marcas disponíveis`,
        {
          x: 23,
          width: 164,
          fontSize: 8.5,
          bold: true,
          color: COLORS.ink,
          spacingAfter: 1.5,
        },
      );

      options.forEach((option) => {
        const product = option.product;
        const price =
          product.price === undefined
            ? "Preço não informado"
            : product.currency === "BRL"
              ? new Intl.NumberFormat(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                ).format(product.price)
              : `${product.currency ?? ""} ${product.price.toFixed(2)}`.trim();

        addText(
          context,
          `• ${product.brand} — ${product.name} — ${price} (${getRoutineMatchLabel(option.matchLevel)})`,
          {
            x: 27,
            width: 160,
            fontSize: 8,
            lineHeight: 4.1,
            spacingAfter: 1.5,
          },
        );
      });

      context.y += 1.5;
    },
  );

  context.y += 3;
}

function addRecommendationsSection(
  context: PdfContext,
  report: ReportWithRoutineGuidance,
): void {
  addSectionHeader(
    context,
    "03",
    "Sua rotina",
    "O que priorizar agora",
    COLORS.purple,
    COLORS.lavender,
  );

  if (
    report.routineGuidance &&
    report.routineGuidance.length > 0
  ) {
    report.routineGuidance.forEach(
      (guidance) => {
        addFindingCard(
          context,
          guidance.title,
          guidance.description,
        );
      },
    );
  }

  if (
    report.recommendations.length ===
    0
  ) {
    const baseline =
      getPdfBaselinePriority(report);

    const titleHeight = measureText(
      context,
      baseline.title,
      {
        width: 156,
        fontSize: 10.2,
        lineHeight: 4.7,
        bold: true,
      },
    );

    const descriptionHeight = measureText(
      context,
      baseline.description,
      {
        width: 156,
        fontSize: 8.6,
        lineHeight: 4.4,
      },
    );

    const actionsHeight =
      measureVectorActionList(
        context,
        baseline.actions,
      );

    const cardHeight =
      22 + titleHeight +
      descriptionHeight +
      actionsHeight;

    ensureSpace(
      context,
      cardHeight + 5,
    );

    const y = context.y;
    setFillColor(
      context.pdf,
      "#FCF9FF",
    );
    setDrawColor(
      context.pdf,
      "#E6D9F4",
    );
    context.pdf.roundedRect(
      16,
      y,
      178,
      cardHeight,
      4,
      4,
      "FD",
    );

    context.y = y + 7;
    addText(
      context,
      "PRIORIDADE INICIAL",
      {
        x: 24,
        width: 156,
        fontSize: 6.2,
        bold: true,
        color: COLORS.purple,
        spacingAfter: 1.5,
      },
    );
    addText(
      context,
      baseline.title,
      {
        x: 24,
        width: 156,
        fontSize: 10.2,
        lineHeight: 4.7,
        bold: true,
        spacingAfter: 2,
      },
    );
    addText(
      context,
      baseline.description,
      {
        x: 24,
        width: 156,
        fontSize: 8.6,
        lineHeight: 4.4,
        color: COLORS.softText,
        spacingAfter: 3,
      },
    );
    addVectorActionList(
      context,
      baseline.actions,
    );

    context.y = y + cardHeight + 5;
    return;
  }

  report.recommendations.forEach(
    (recommendation, index) => {
      ensureSpace(context, 30);
      addText(
        context,
        `PRIORIDADE ${index + 1}`,
        {
          x: 20,
          width: 166,
          fontSize: 6.2,
          bold: true,
          color: COLORS.purple,
          spacingAfter: 1,
        },
      );
      addText(
        context,
        recommendation.title,
        {
          x: 20,
          width: 166,
          fontSize: 11.5,
          bold: true,
          spacingAfter: 1.5,
        },
      );
      addText(
        context,
        recommendation.rationale,
        {
          x: 20,
          width: 166,
          fontSize: 8.4,
          lineHeight: 4.3,
          color: COLORS.softText,
          spacingAfter: 5,
        },
      );

      addIngredientGuidance(
        context,
        recommendation,
      );

      if (
        index <
        report.recommendations.length -
          1
      ) {
        ensureSpace(context, 7);
        setDrawColor(
          context.pdf,
          "#E8DDD6",
        );
        context.pdf.line(
          20,
          context.y,
          190,
          context.y,
        );
        context.y += 7;
      }
    },
  );

  addRoutineProducts(
    context,
    report,
  );
}

function addDisclaimer(
  context: PdfContext,
  report: AnalysisReport,
): void {
  const height =
    measureText(
      context,
      report.disclaimer,
      {
        width: 112,
        fontSize: 6.4,
        lineHeight: 3.4,
      },
    ) + 13;

  ensureSpace(
    context,
    height + 5,
  );

  const y = context.y;
  setDrawColor(
    context.pdf,
    "#F0C8B3",
  );
  context.pdf.line(
    54,
    y,
    194,
    y,
  );

  context.pdf.setFont(
    "helvetica",
    "bold",
  );
  context.pdf.setFontSize(6.3);
  setTextColor(
    context.pdf,
    COLORS.ink,
  );
  context.pdf.text(
    "SOBRE ESTA ANÁLISE",
    58,
    y + 7,
  );

  context.y = y + 11;
  addText(
    context,
    report.disclaimer,
    {
      x: 58,
      width: 108,
      fontSize: 6.4,
      lineHeight: 3.4,
      color: COLORS.softText,
      spacingAfter: 0,
    },
  );

  drawBrandMark(
    context,
    171,
    y + 3,
    0.42,
  );
}

function drawFirstPageHeader(
  context: PdfContext,
  report: AnalysisReport,
): void {
  drawPageBackground(context);

  drawBrandMark(
    context,
    17,
    12,
    0.84,
  );

  context.pdf.setFont(
    "helvetica",
    "bold",
  );
  context.pdf.setFontSize(18);
  setTextColor(
    context.pdf,
    COLORS.ink,
  );
  context.pdf.text(
    "Minha Cabeleira",
    49,
    25,
  );

  context.pdf.setFontSize(6.5);
  setTextColor(
    context.pdf,
    COLORS.softText,
  );
  context.pdf.text(
    "ANÁLISE CAPILAR PERSONALIZADA",
    49,
    31,
  );

  context.pdf.setFont(
    "helvetica",
    "normal",
  );
  context.pdf.setFontSize(6.4);
  setTextColor(
    context.pdf,
    COLORS.ink,
  );
  context.pdf.text(
    ["CUIDADO", "SEM", "RÓTULOS"],
    177,
    16,
  );

  setDrawColor(
    context.pdf,
    COLORS.coral,
  );
  context.pdf.setLineWidth(0.7);
  context.pdf.line(
    177,
    29,
    188,
    29,
  );

  context.y = 46;

  addText(
    context,
    "SEU RELATÓRIO PERSONALIZADO",
    {
      fontSize: 6.7,
      bold: true,
      color: COLORS.coral,
      spacingAfter: 1.5,
    },
  );
  addText(
    context,
    report.title,
    {
      fontSize: 22,
      lineHeight: 9,
      bold: true,
      spacingAfter: 2,
    },
  );
  addText(
    context,
    report.introduction,
    {
      width: 120,
      fontSize: 9,
      lineHeight: 4.8,
      color: COLORS.softText,
      spacingAfter: 7,
    },
  );
}

export async function generateAnalysisPdf(
  report: AnalysisReport,
): Promise<void> {
  const brandImage =
    await loadBrandImage();

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const context: PdfContext = {
    pdf,
    y: 0,
    pageNumber: 1,
    brandImage,
  };

  drawFirstPageHeader(
    context,
    report,
  );

  addFindingSection(
    context,
    report,
  );
  addSafetySection(
    context,
    report,
  );
  addRecommendationsSection(
    context,
    report as ReportWithRoutineGuidance,
  );
  addDisclaimer(
    context,
    report,
  );

  drawFooterBrand(context);

  pdf.save(
    "minha-cabeleira-analise.pdf",
  );
}
