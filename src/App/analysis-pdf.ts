import {
  jsPDF,
} from "jspdf";

import type {
  AnalysisReport,
} from "./analysis-report-model";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;

const MARGIN_X = 20;
const MARGIN_TOP = 22;
const MARGIN_BOTTOM = 22;

const CONTENT_WIDTH =
  PAGE_WIDTH - MARGIN_X * 2;

const TEXT_COLOR = "#292522";
const SOFT_TEXT_COLOR = "#6F625B";
const PRIMARY_COLOR = "#62493B";

type PdfContext = {
  pdf: jsPDF;
  y: number;
};

function ensureSpace(
  context: PdfContext,
  requiredHeight: number,
): void {
  if (
    context.y + requiredHeight >
    PAGE_HEIGHT - MARGIN_BOTTOM
  ) {
    context.pdf.addPage();
    context.y = MARGIN_TOP;
  }
}

function getWrappedTextHeight(
  context: PdfContext,
  text: string,
  options?: {
    fontSize?: number;
    lineHeight?: number;
  },
): number {
  const fontSize =
    options?.fontSize ?? 10;

  const lineHeight =
    options?.lineHeight ?? 5;

  context.pdf.setFontSize(
    fontSize,
  );

  const lines =
    context.pdf.splitTextToSize(
      text,
      CONTENT_WIDTH,
    ) as string[];

  return lines.length * lineHeight;
}

function addWrappedText(
  context: PdfContext,
  text: string,
  options?: {
    fontSize?: number;
    lineHeight?: number;
    bold?: boolean;
    color?: string;
    spacingAfter?: number;
  },
): void {
  const fontSize =
    options?.fontSize ?? 10;

  const lineHeight =
    options?.lineHeight ?? 5;

  const spacingAfter =
    options?.spacingAfter ?? 3;

  const color =
    options?.color ?? TEXT_COLOR;

  context.pdf.setFont(
    "helvetica",
    options?.bold
      ? "bold"
      : "normal",
  );

  context.pdf.setFontSize(
    fontSize,
  );

  context.pdf.setTextColor(
    color,
  );

  const lines =
    context.pdf.splitTextToSize(
      text,
      CONTENT_WIDTH,
    ) as string[];

  const requiredHeight =
    lines.length * lineHeight;

  ensureSpace(
    context,
    requiredHeight +
      spacingAfter,
  );

  context.pdf.text(
    lines,
    MARGIN_X,
    context.y,
  );

  context.y +=
    requiredHeight +
    spacingAfter;
}

function addSectionTitle(
  context: PdfContext,
  number: string,
  title: string,
): void {
  ensureSpace(context, 18);

  context.pdf.setFont(
    "helvetica",
    "bold",
  );

  context.pdf.setFontSize(9);

  context.pdf.setTextColor(
    PRIMARY_COLOR,
  );

  context.pdf.text(
    number,
    MARGIN_X,
    context.y,
  );

  context.pdf.setFontSize(15);

  context.pdf.setTextColor(
    TEXT_COLOR,
  );

  context.pdf.text(
    title,
    MARGIN_X + 12,
    context.y,
  );

  context.y += 11;
}

function addDivider(
  context: PdfContext,
): void {
  ensureSpace(context, 8);

  context.pdf.setDrawColor(
    "#DDD5D0",
  );

  context.pdf.line(
    MARGIN_X,
    context.y,
    PAGE_WIDTH - MARGIN_X,
    context.y,
  );

  context.y += 8;
}

function addFindingSection(
  context: PdfContext,
  report: AnalysisReport,
): void {
  addSectionTitle(
    context,
    "01",
    "O que observamos no seu cabelo",
  );

  if (report.findings.length === 0) {
    addWrappedText(
      context,
      "Ainda não encontramos evidências suficientes para destacar um padrão específico a partir das respostas fornecidas.",
      {
        color: SOFT_TEXT_COLOR,
        spacingAfter: 7,
      },
    );

    return;
  }

  for (
    const finding of
    report.findings
  ) {
    addWrappedText(
      context,
      finding.title,
      {
        fontSize: 11,
        bold: true,
        spacingAfter: 1,
      },
    );

    addWrappedText(
      context,
      finding.description,
      {
        color: SOFT_TEXT_COLOR,
        spacingAfter: 7,
      },
    );
  }
}

function addSafetySection(
  context: PdfContext,
  report: AnalysisReport,
): void {
  addSectionTitle(
    context,
    "02",
    "Segurança",
  );

  addWrappedText(
    context,
    report.safety.title,
    {
      fontSize: 11,
      bold: true,
      spacingAfter: 2,
    },
  );

  addWrappedText(
    context,
    report.safety.description,
    {
      color: SOFT_TEXT_COLOR,
      spacingAfter: 4,
    },
  );

  for (
    const notice of
    report.safety.notices
  ) {
    addWrappedText(
      context,
      `• ${notice}`,
      {
        color: SOFT_TEXT_COLOR,
        spacingAfter: 2,
      },
    );
  }

  context.y += 4;
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
    addWrappedText(
      context,
      "Orientação de fórmula pausada",
      {
        fontSize: 10,
        bold: true,
        spacingAfter: 2,
      },
    );

    addWrappedText(
      context,
      "Por segurança, as orientações de fórmula não são exibidas neste resultado.",
      {
        color: SOFT_TEXT_COLOR,
        spacingAfter: 6,
      },
    );

    return;
  }

  if (!guidance) {
    return;
  }

  addWrappedText(
    context,
    "O que procurar na fórmula",
    {
      fontSize: 10,
      bold: true,
      spacingAfter: 2,
    },
  );

  addWrappedText(
    context,
    guidance.summary,
    {
      color: SOFT_TEXT_COLOR,
      spacingAfter: 5,
    },
  );

  for (
    const item of
    guidance.lookFor
  ) {
    addWrappedText(
      context,
      item.name,
      {
        fontSize: 10,
        bold: true,
        spacingAfter: 1,
      },
    );

    addWrappedText(
      context,
      item.purpose,
      {
        color: SOFT_TEXT_COLOR,
        spacingAfter: 2,
      },
    );

    if (
      item.examples.length > 0
    ) {
      const examples =
        item.examples
          .map(
            (example) =>
              example.inciName ??
              example.name,
          )
          .join(", ");

      addWrappedText(
        context,
        `Exemplos no rótulo: ${examples}`,
        {
          fontSize: 9,
          color:
            PRIMARY_COLOR,
          spacingAfter: 5,
        },
      );
    }
  }

  if (
    guidance.avoid.length > 0
  ) {
    addWrappedText(
      context,
      "Pontos de atenção",
      {
        fontSize: 10,
        bold: true,
        spacingAfter: 2,
      },
    );

    for (
      const item of
      guidance.avoid
    ) {
      addWrappedText(
        context,
        item.name,
        {
          bold: true,
          spacingAfter: 1,
        },
      );

      addWrappedText(
        context,
        item.purpose,
        {
          color:
            SOFT_TEXT_COLOR,
          spacingAfter: 4,
        },
      );
    }
  }

  addWrappedText(
    context,
    "A presença de um ingrediente isolado não garante o desempenho do produto. A formulação como um todo, a combinação dos componentes e o modo de uso também importam.",
    {
      fontSize: 8,
      color: SOFT_TEXT_COLOR,
      spacingAfter: 7,
    },
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
    addWrappedText(
      context,
      "Sugestões de produtos pausadas",
      {
        fontSize: 10,
        bold: true,
        spacingAfter: 2,
      },
    );

    addWrappedText(
      context,
      "As sugestões de produtos do catálogo foram bloqueadas por segurança neste resultado.",
      {
        color: SOFT_TEXT_COLOR,
        spacingAfter: 7,
      },
    );

    return;
  }

  if (
    recommendation.products.length ===
    0
  ) {
    addWrappedText(
      context,
      "Nenhum produto do catálogo atual atende aos critérios desta recomendação. Isso não altera a orientação de fórmula acima.",
      {
        color: SOFT_TEXT_COLOR,
        spacingAfter: 7,
      },
    );

    return;
  }

  addWrappedText(
    context,
    "Produtos compatíveis",
    {
      fontSize: 10,
      bold: true,
      spacingAfter: 2,
    },
  );

  addWrappedText(
    context,
    "Os produtos abaixo atendem aos critérios desta recomendação. A marca não determina a recomendação.",
    {
      fontSize: 9,
      color: SOFT_TEXT_COLOR,
      spacingAfter: 4,
    },
  );

  for (
    const product of
    recommendation.products
  ) {
    const price =
      product.price === undefined
        ? "Preço não informado"
        : product.currency ===
            "BRL"
          ? new Intl.NumberFormat(
              "pt-BR",
              {
                style:
                  "currency",
                currency:
                  "BRL",
              },
            ).format(
              product.price,
            )
          : `${product.currency ?? ""} ${product.price.toFixed(
              2,
            )}`.trim();

    addWrappedText(
      context,
      `${product.name} — ${product.brand}`,
      {
        bold: true,
        spacingAfter: 1,
      },
    );

    addWrappedText(
      context,
      price,
      {
        fontSize: 9,
        color:
          PRIMARY_COLOR,
        spacingAfter: 5,
      },
    );
  }
}

function addRecommendationsSection(
  context: PdfContext,
  report: AnalysisReport,
): void {
  addSectionTitle(
    context,
    "03",
    "O que priorizar agora",
  );

  if (
    report.recommendations.length ===
    0
  ) {
    addWrappedText(
      context,
      "Ainda não há uma recomendação específica para este resultado.",
      {
        color: SOFT_TEXT_COLOR,
      },
    );

    return;
  }

  report.recommendations.forEach(
    (
      recommendation,
      index,
    ) => {
      addWrappedText(
        context,
        `Prioridade ${index + 1}`,
        {
          fontSize: 8,
          bold: true,
          color:
            PRIMARY_COLOR,
          spacingAfter: 1,
        },
      );

      addWrappedText(
        context,
        recommendation.title,
        {
          fontSize: 12,
          bold: true,
          spacingAfter: 2,
        },
      );

      addWrappedText(
        context,
        recommendation.rationale,
        {
          color:
            SOFT_TEXT_COLOR,
          spacingAfter: 5,
        },
      );

      addIngredientGuidance(
        context,
        recommendation,
      );

      addProducts(
        context,
        recommendation,
      );

      if (
        index <
        report.recommendations
          .length -
          1
      ) {
        addDivider(context);
      }
    },
  );
}

function addDisclaimerSection(
  context: PdfContext,
  report: AnalysisReport,
): void {
  const dividerHeight = 8;

  const titleHeight =
    getWrappedTextHeight(
      context,
      "Sobre esta análise",
      {
        fontSize: 10,
        lineHeight: 5,
      },
    ) + 2;

  const disclaimerHeight =
    getWrappedTextHeight(
      context,
      report.disclaimer,
      {
        fontSize: 8,
        lineHeight: 5,
      },
    );

  const requiredHeight =
    dividerHeight +
    titleHeight +
    disclaimerHeight;

  ensureSpace(
    context,
    requiredHeight,
  );

  context.pdf.setDrawColor(
    "#DDD5D0",
  );

  context.pdf.line(
    MARGIN_X,
    context.y,
    PAGE_WIDTH - MARGIN_X,
    context.y,
  );

  context.y += 8;

  addWrappedText(
    context,
    "Sobre esta análise",
    {
      fontSize: 10,
      bold: true,
      spacingAfter: 2,
    },
  );

  addWrappedText(
    context,
    report.disclaimer,
    {
      fontSize: 8,
      color: SOFT_TEXT_COLOR,
      spacingAfter: 0,
    },
  );
}

export function generateAnalysisPdf(
  report: AnalysisReport,
): void {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const context: PdfContext = {
    pdf,
    y: MARGIN_TOP,
  };

  pdf.setFont(
    "helvetica",
    "bold",
  );

  pdf.setFontSize(9);

  pdf.setTextColor(
    PRIMARY_COLOR,
  );

  pdf.text(
    "MINHA CABELEIRA",
    MARGIN_X,
    context.y,
  );

  context.y += 10;

  addWrappedText(
    context,
    report.title,
    {
      fontSize: 22,
      bold: true,
      spacingAfter: 4,
    },
  );

  addWrappedText(
    context,
    report.introduction,
    {
      fontSize: 10,
      color: SOFT_TEXT_COLOR,
      spacingAfter: 9,
    },
  );

  addDivider(context);

  addFindingSection(
    context,
    report,
  );

  addDivider(context);

  addSafetySection(
    context,
    report,
  );

  addDivider(context);

  addRecommendationsSection(
    context,
    report,
  );

  addDisclaimerSection(
    context,
    report,
  );

  pdf.save(
    "minha-cabeleira-analise.pdf",
  );
}