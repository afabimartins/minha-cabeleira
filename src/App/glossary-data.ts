export type GlossaryReference = {
  id: string;
  citation: string;
};

export type GlossaryEntry = {
  slug: string;
  name: string;
  inciName?: string;
  englishName?: string;
  spanishName?: string;
  aliases?: string[];
  category: string;
  summary: string;
  whatItDoes: string[];
  limitations: string;
  commonlyFoundIn: string[];
  related: string[];
  references: GlossaryReference[];
};

const ROBBINS: GlossaryReference = {
  id: "robbins-2012",
  citation:
    "Robbins, C. R. Chemical and Physical Behavior of Human Hair. 5ª ed. Springer, 2012.",
};

const DSOUZA_RATHI: GlossaryReference = {
  id: "dsouza-rathi-2015",
  citation:
    "D'Souza, P.; Rathi, S. K. Shampoo and conditioners: What a dermatologist should know? Indian Journal of Dermatology, 2015; 60(3): 248–254.",
};

const BAREL: GlossaryReference = {
  id: "barel-2014",
  citation:
    "Barel, A. O.; Paye, M.; Maibach, H. I. Handbook of Cosmetic Science and Technology. 4ª ed. CRC Press, 2014.",
};

const baseGlossaryEntries: GlossaryEntry[] = [
  {
    slug: "glycerin",
    name: "Glycerin",
    inciName: "Glycerin",
    category: "Umectante",
    summary:
      "Umectante amplamente usado em cosméticos. Tem afinidade pela água e pode contribuir para propriedades de hidratação e condicionamento da formulação.",
    whatItDoes: [
      "Pode ajudar a reter água na formulação e na superfície do fio.",
      "Pode participar de fórmulas voltadas à maciez e flexibilidade.",
      "Costuma ser combinada a condicionantes, emolientes e formadores de filme.",
    ],
    limitations:
      "A presença de glicerina no rótulo, isoladamente, não permite prever o resultado no cabelo. Concentração, veículo, combinação de ingredientes, clima e modo de uso influenciam o desempenho final.",
    commonlyFoundIn: [
      "condicionadores",
      "máscaras",
      "leave-ins",
      "cremes de pentear",
    ],
    related: ["panthenol", "propanediol", "umectante"],
    references: [BAREL, ROBBINS],
  },
  {
    slug: "panthenol",
    name: "Panthenol",
    inciName: "Panthenol",
    category: "Umectante e condicionante",
    summary:
      "Pró-vitamina B5 usada em cosméticos por suas propriedades umectantes e condicionantes.",
    whatItDoes: [
      "Pode contribuir para sensação de maciez e maleabilidade.",
      "Pode integrar sistemas de condicionamento e hidratação cosmética.",
      "É encontrado em produtos de enxágue e sem enxágue.",
    ],
    limitations:
      "Não é possível inferir intensidade de efeito apenas por sua presença no INCI. O desempenho depende da formulação completa e do uso.",
    commonlyFoundIn: [
      "shampoos",
      "condicionadores",
      "máscaras",
      "leave-ins",
    ],
    related: ["glycerin", "propanediol", "umectante"],
    references: [BAREL, ROBBINS],
  },
  {
    slug: "propanediol",
    name: "Propanediol",
    inciName: "Propanediol",
    category: "Umectante e solvente",
    summary:
      "Ingrediente multifuncional usado como umectante, solvente e auxiliar sensorial em formulações cosméticas.",
    whatItDoes: [
      "Pode contribuir para retenção de água na formulação.",
      "Pode ajudar na solubilização e distribuição de outros componentes.",
      "Pode colaborar com a sensorialidade de produtos capilares.",
    ],
    limitations:
      "Sua função real depende do sistema em que está inserido; a posição no rótulo não informa sozinha a concentração exata nem o efeito final.",
    commonlyFoundIn: ["leave-ins", "séruns", "máscaras", "loções"],
    related: ["glycerin", "panthenol", "umectante"],
    references: [BAREL],
  },
  {
    slug: "caprylic-capric-triglyceride",
    name: "Caprylic/Capric Triglyceride",
    inciName: "Caprylic/Capric Triglyceride",
    category: "Emoliente",
    summary:
      "Emoliente lipídico usado para melhorar espalhabilidade, lubrificação e sensorial de formulações.",
    whatItDoes: [
      "Pode aumentar o deslizamento da formulação sobre os fios.",
      "Pode contribuir para redução de atrito e sensação de maciez.",
      "É frequentemente associado a outros emolientes e condicionantes.",
    ],
    limitations:
      "Não significa, por si só, que uma fórmula será pesada ou leve. O resultado depende da combinação e da quantidade dos componentes.",
    commonlyFoundIn: ["máscaras", "leave-ins", "óleos cosméticos", "séruns"],
    related: ["coco-caprylate-caprate", "emoliente"],
    references: [BAREL],
  },
  {
    slug: "coco-caprylate-caprate",
    name: "Coco-Caprylate/Caprate",
    inciName: "Coco-Caprylate/Caprate",
    category: "Emoliente",
    summary:
      "Éster emoliente usado para favorecer espalhabilidade, toque e lubrificação em cosméticos.",
    whatItDoes: [
      "Pode melhorar o deslizamento durante a aplicação.",
      "Pode contribuir para sensação de maciez e redução de aspereza superficial.",
      "Pode ser usado em formulações que buscam sensorial menos oleoso.",
    ],
    limitations:
      "A percepção de peso ou leveza não depende de um único emoliente; a arquitetura da fórmula é determinante.",
    commonlyFoundIn: ["leave-ins", "séruns", "máscaras", "finalizadores"],
    related: ["caprylic-capric-triglyceride", "emoliente"],
    references: [BAREL],
  },
  {
    slug: "behentrimonium-chloride",
    name: "Behentrimonium Chloride",
    inciName: "Behentrimonium Chloride",
    category: "Condicionante catiônico",
    summary:
      "Agente catiônico usado principalmente em condicionadores e máscaras para melhorar desembaraço, maciez e deslizamento.",
    whatItDoes: [
      "Pode reduzir a força necessária para pentear o cabelo molhado.",
      "Pode melhorar maleabilidade e alinhamento superficial dos fios.",
      "Costuma atuar em conjunto com álcoois graxos e outros condicionantes.",
    ],
    limitations:
      "A resposta sensorial depende da concentração, do sistema emulsificante e de outros ingredientes da fórmula.",
    commonlyFoundIn: ["condicionadores", "máscaras", "cremes de tratamento"],
    related: [
      "cetrimonium-chloride",
      "behentrimonium-methosulfate",
      "condicionante-cationico",
    ],
    references: [DSOUZA_RATHI, BAREL, ROBBINS],
  },
  {
    slug: "cetrimonium-chloride",
    name: "Cetrimonium Chloride",
    inciName: "Cetrimonium Chloride",
    category: "Condicionante catiônico",
    summary:
      "Agente catiônico usado em cosméticos capilares para condicionamento, desembaraço e controle de eletricidade estática.",
    whatItDoes: [
      "Pode melhorar penteabilidade e deslizamento.",
      "Pode reduzir eletricidade estática e atrito superficial.",
      "É utilizado em diferentes sistemas de condicionamento.",
    ],
    limitations:
      "A presença no INCI não indica sozinha intensidade do condicionamento; concentração e formulação completa importam.",
    commonlyFoundIn: ["condicionadores", "máscaras", "leave-ins"],
    related: [
      "behentrimonium-chloride",
      "behentrimonium-methosulfate",
      "condicionante-cationico",
    ],
    references: [DSOUZA_RATHI, BAREL],
  },
  {
    slug: "behentrimonium-methosulfate",
    name: "Behentrimonium Methosulfate",
    inciName: "Behentrimonium Methosulfate",
    category: "Condicionante catiônico",
    summary:
      "Ingrediente catiônico usado em sistemas condicionantes para facilitar desembaraço e melhorar a sensação do fio.",
    whatItDoes: [
      "Pode favorecer penteabilidade e suavidade.",
      "Pode integrar emulsões condicionantes com álcoois graxos.",
      "Pode contribuir para redução de atrito durante o cuidado diário.",
    ],
    limitations:
      "O termo “methosulfate” faz parte do nome químico do ingrediente e não deve ser confundido automaticamente com os tensoativos sulfatos usados em limpeza.",
    commonlyFoundIn: ["condicionadores", "máscaras", "cremes de tratamento"],
    related: ["behentrimonium-chloride", "condicionante-cationico"],
    references: [DSOUZA_RATHI, BAREL],
  },
  {
    slug: "cetearyl-alcohol",
    name: "Cetearyl Alcohol",
    inciName: "Cetearyl Alcohol",
    category: "Álcool graxo",
    summary:
      "Mistura de álcoois graxos usada para dar corpo, estabilidade e sensorial a emulsões condicionantes.",
    whatItDoes: [
      "Pode contribuir para maciez e consistência da formulação.",
      "Ajuda a estruturar emulsões e sistemas condicionantes.",
      "Costuma aparecer ao lado de agentes catiônicos.",
    ],
    limitations:
      "Álcoois graxos não devem ser interpretados da mesma forma que álcoois voláteis apenas pela palavra “alcohol” no rótulo.",
    commonlyFoundIn: ["condicionadores", "máscaras", "cremes"],
    related: ["cetyl-alcohol", "stearyl-alcohol", "alcool-graxo"],
    references: [BAREL, DSOUZA_RATHI],
  },
  {
    slug: "cetyl-alcohol",
    name: "Cetyl Alcohol",
    inciName: "Cetyl Alcohol",
    category: "Álcool graxo",
    summary:
      "Álcool graxo utilizado como emoliente, espessante e coestruturante de emulsões cosméticas.",
    whatItDoes: [
      "Pode melhorar consistência e espalhabilidade.",
      "Pode contribuir para sensorial de maciez.",
      "Pode apoiar sistemas de condicionamento.",
    ],
    limitations:
      "Não é adequado classificar todos os álcoois cosméticos como ressecantes. Famílias químicas e funções são diferentes.",
    commonlyFoundIn: ["condicionadores", "máscaras", "cremes"],
    related: ["cetearyl-alcohol", "stearyl-alcohol", "alcool-graxo"],
    references: [BAREL],
  },
  {
    slug: "stearyl-alcohol",
    name: "Stearyl Alcohol",
    inciName: "Stearyl Alcohol",
    category: "Álcool graxo",
    summary:
      "Álcool graxo usado para estrutura, viscosidade, emoliência e sensorial de formulações.",
    whatItDoes: [
      "Pode dar corpo a condicionadores e máscaras.",
      "Pode colaborar com lubricidade e sensação de maciez.",
      "Pode participar da organização de sistemas emulsificados.",
    ],
    limitations:
      "A palavra “alcohol” no nome não é suficiente para prever efeito de ressecamento; sua função é diferente da de álcoois voláteis.",
    commonlyFoundIn: ["condicionadores", "máscaras", "cremes"],
    related: ["cetearyl-alcohol", "cetyl-alcohol", "alcool-graxo"],
    references: [BAREL],
  },
  {
    slug: "amodimethicone",
    name: "Amodimethicone",
    inciName: "Amodimethicone",
    category: "Silicone condicionante",
    summary:
      "Silicone funcionalizado usado para condicionamento, redução de atrito e formação de filme sobre a fibra capilar.",
    whatItDoes: [
      "Pode melhorar deslizamento e penteabilidade.",
      "Pode reduzir atrito e ajudar no controle de frizz e eletricidade estática.",
      "Pode participar de estratégias cosméticas de proteção superficial.",
    ],
    limitations:
      "Silicones não devem ser classificados automaticamente como bons ou ruins. Tipo de silicone, sistema de deposição, quantidade e rotina de limpeza influenciam o resultado.",
    commonlyFoundIn: ["condicionadores", "máscaras", "leave-ins", "séruns"],
    related: ["dimethicone", "formador-de-filme"],
    references: [ROBBINS, BAREL, DSOUZA_RATHI],
  },
  {
    slug: "dimethicone",
    name: "Dimethicone",
    inciName: "Dimethicone",
    category: "Silicone e formador de filme",
    summary:
      "Silicone usado em cosméticos para lubrificação, suavidade, brilho e redução de atrito superficial.",
    whatItDoes: [
      "Pode melhorar a sensação de deslizamento.",
      "Pode formar filme e reduzir atrito na superfície da fibra.",
      "Pode contribuir para brilho e controle sensorial do frizz.",
    ],
    limitations:
      "O efeito varia conforme viscosidade, concentração, sistema de dispersão e combinação com outros ingredientes.",
    commonlyFoundIn: ["condicionadores", "máscaras", "séruns", "finalizadores"],
    related: ["amodimethicone", "formador-de-filme"],
    references: [ROBBINS, BAREL],
  },
  {
    slug: "hydrolyzed-keratin",
    name: "Hydrolyzed Keratin",
    inciName: "Hydrolyzed Keratin",
    category: "Proteína hidrolisada",
    summary:
      "Mistura de fragmentos proteicos obtidos por hidrólise de queratina, usada em formulações capilares por propriedades de condicionamento e formação de filme.",
    whatItDoes: [
      "Pode atuar temporariamente sobre a superfície da fibra.",
      "Pode participar de sistemas voltados a condicionamento e redução de aspereza.",
      "Pode contribuir para propriedades de filme dependendo da matéria-prima e formulação.",
    ],
    limitations:
      "O uso cosmético de proteínas hidrolisadas não significa reconstrução biológica ou reparo permanente do fio.",
    commonlyFoundIn: ["máscaras", "condicionadores", "leave-ins", "tratamentos"],
    related: ["hydrolyzed-wheat-protein", "hydrolyzed-rice-protein"],
    references: [ROBBINS, BAREL],
  },
  {
    slug: "hydrolyzed-wheat-protein",
    name: "Hydrolyzed Wheat Protein",
    inciName: "Hydrolyzed Wheat Protein",
    category: "Proteína hidrolisada",
    summary:
      "Proteína vegetal hidrolisada empregada em cosméticos por propriedades de filme e condicionamento.",
    whatItDoes: [
      "Pode contribuir para filme superficial e sensorial.",
      "Pode integrar fórmulas destinadas a melhorar maleabilidade e toque.",
      "Seu comportamento depende do tamanho molecular e da formulação.",
    ],
    limitations:
      "Não representa reconstrução permanente da estrutura do cabelo e não deve ser avaliada isoladamente do restante da fórmula.",
    commonlyFoundIn: ["máscaras", "condicionadores", "leave-ins"],
    related: ["hydrolyzed-keratin", "hydrolyzed-rice-protein"],
    references: [ROBBINS, BAREL],
  },
  {
    slug: "hydrolyzed-rice-protein",
    name: "Hydrolyzed Rice Protein",
    inciName: "Hydrolyzed Rice Protein",
    category: "Proteína hidrolisada",
    summary:
      "Proteína de arroz hidrolisada usada como componente condicionante e formador de filme em algumas formulações capilares.",
    whatItDoes: [
      "Pode contribuir para propriedades de filme superficial.",
      "Pode participar de fórmulas voltadas à maleabilidade e sensação de corpo.",
      "Pode atuar em conjunto com outros condicionantes.",
    ],
    limitations:
      "O resultado depende da matéria-prima, concentração e sistema cosmético; não equivale a reparo permanente da fibra.",
    commonlyFoundIn: ["máscaras", "leave-ins", "condicionadores"],
    related: ["hydrolyzed-keratin", "hydrolyzed-wheat-protein"],
    references: [ROBBINS, BAREL],
  },
  {
    slug: "umectante",
    name: "Umectante",
    category: "Termo técnico",
    summary:
      "Classe funcional de ingredientes com afinidade pela água, usada em cosméticos para ajudar a controlar e reter umidade na formulação e em superfícies.",
    whatItDoes: [
      "Pode participar de sistemas de hidratação cosmética.",
      "Pode atuar em conjunto com emolientes, condicionantes e formadores de filme.",
      "Inclui ingredientes com propriedades e comportamentos diferentes entre si.",
    ],
    limitations:
      "Classificar um ingrediente como umectante não permite prever sozinho o desempenho de um produto ou o resultado em diferentes condições ambientais.",
    commonlyFoundIn: ["shampoos", "condicionadores", "máscaras", "leave-ins"],
    related: ["glycerin", "panthenol", "propanediol"],
    references: [BAREL],
  },
  {
    slug: "emoliente",
    name: "Emoliente",
    category: "Termo técnico",
    summary:
      "Ingrediente que pode melhorar espalhabilidade, lubrificação, flexibilidade e sensação de maciez em formulações cosméticas.",
    whatItDoes: [
      "Pode reduzir sensação de aspereza superficial.",
      "Pode melhorar deslizamento e sensorial.",
      "Pode integrar fases lipídicas de cremes, máscaras e finalizadores.",
    ],
    limitations:
      "“Emoliente” descreve uma função, não um resultado universal. Diferentes emolientes têm perfis sensoriais e de deposição distintos.",
    commonlyFoundIn: ["máscaras", "condicionadores", "leave-ins", "séruns"],
    related: ["caprylic-capric-triglyceride", "coco-caprylate-caprate"],
    references: [BAREL],
  },
  {
    slug: "condicionante-cationico",
    name: "Condicionante catiônico",
    category: "Termo técnico",
    summary:
      "Família de ingredientes com carga positiva usada para melhorar penteabilidade, reduzir eletricidade estática e favorecer condicionamento da fibra.",
    whatItDoes: [
      "Pode se depositar preferencialmente em regiões mais negativamente carregadas da fibra.",
      "Pode reduzir atrito durante penteado e desembaraço.",
      "É base de muitos sistemas de condicionadores e máscaras.",
    ],
    limitations:
      "Ingredientes catiônicos variam em estrutura, concentração e comportamento. O resultado depende da formulação completa.",
    commonlyFoundIn: ["condicionadores", "máscaras", "leave-ins"],
    related: [
      "behentrimonium-chloride",
      "cetrimonium-chloride",
      "behentrimonium-methosulfate",
    ],
    references: [ROBBINS, DSOUZA_RATHI, BAREL],
  },
  {
    slug: "alcool-graxo",
    name: "Álcool graxo",
    category: "Termo técnico",
    summary:
      "Família de álcoois de cadeia longa usada em cosméticos principalmente para emoliência, estrutura e estabilidade de emulsões.",
    whatItDoes: [
      "Pode dar corpo e consistência a condicionadores e máscaras.",
      "Pode contribuir para maciez e sensorial.",
      "É frequentemente usado em conjunto com condicionantes catiônicos.",
    ],
    limitations:
      "Álcoois graxos não são equivalentes a álcoois voláteis. A palavra “alcohol” sozinha não determina se um ingrediente será ressecante.",
    commonlyFoundIn: ["condicionadores", "máscaras", "cremes"],
    related: ["cetearyl-alcohol", "cetyl-alcohol", "stearyl-alcohol"],
    references: [BAREL, DSOUZA_RATHI],
  },
  {
    slug: "formador-de-filme",
    name: "Formador de filme",
    category: "Termo técnico",
    summary:
      "Ingrediente capaz de deixar uma película contínua ou parcialmente contínua sobre a superfície após aplicação.",
    whatItDoes: [
      "Pode reduzir atrito e modificar sensorial da fibra.",
      "Pode ajudar no controle de frizz e na proteção superficial.",
      "Pode ser obtido com diferentes famílias de polímeros, silicones e proteínas.",
    ],
    limitations:
      "Formação de filme não significa selamento permanente do fio. O filme pode mudar com lavagem, atrito, umidade e outros fatores.",
    commonlyFoundIn: ["leave-ins", "séruns", "condicionadores", "tratamentos"],
    related: ["amodimethicone", "dimethicone", "hydrolyzed-keratin"],
    references: [ROBBINS, BAREL],
  },
  {
    slug: "porosidade-capilar",
    name: "Porosidade capilar",
    category: "Comportamento da fibra",
    summary:
      "Termo usado para descrever como a fibra capilar interage com água e substâncias, especialmente em relação à entrada, saída e retenção de umidade. Não é um rótulo fixo nem um diagnóstico.",
    whatItDoes: [
      "Ajuda a organizar observações sobre molhamento, secagem e retenção de umidade.",
      "Pode mudar ao longo do comprimento e após desgaste químico, térmico ou mecânico.",
      "Pode ser discutida junto com condição da cutícula, dano e histórico de cuidados.",
    ],
    limitations:
      "Testes caseiros isolados, como observar se um fio flutua em um copo d’água, não medem porosidade de forma confiável. O comportamento real depende de vários fatores e deve ser interpretado em conjunto.",
    commonlyFoundIn: ["análises de comportamento do fio", "conteúdo técnico capilar"],
    related: ["retencao-de-umidade", "cuticula-capilar", "quebra-capilar"],
    references: [ROBBINS],
  },
  {
    slug: "retencao-de-umidade",
    name: "Retenção de umidade",
    category: "Comportamento da fibra",
    summary:
      "Descrição do quanto o cabelo mantém sensação de umidade, flexibilidade e condicionamento ao longo do tempo após ser molhado ou tratado.",
    whatItDoes: [
      "Ajuda a interpretar relatos de ressecamento rápido ou perda de maciez.",
      "Pode orientar a escolha de sistemas que combinem umectação, emoliência, condicionamento e formação de filme.",
      "Deve ser considerada junto com clima, rotina, lavagem e histórico de dano.",
    ],
    limitations:
      "A sensação de ‘hidratação’ não depende de um único ingrediente e não é equivalente a medir diretamente água dentro da fibra em casa.",
    commonlyFoundIn: ["análises capilares", "rotinas de condicionamento", "conteúdo técnico"],
    related: ["porosidade-capilar", "umectante", "emoliente", "formador-de-filme"],
    references: [ROBBINS, BAREL],
  },
  {
    slug: "elasticidade-capilar",
    name: "Elasticidade capilar",
    category: "Propriedade da fibra",
    summary:
      "Capacidade da fibra de se alongar sob tensão e retornar, em alguma medida, à forma anterior. Está relacionada às propriedades mecânicas do fio.",
    whatItDoes: [
      "Pode ajudar a contextualizar fragilidade e resposta à manipulação.",
      "Pode ser afetada por água, dano e processos químicos.",
      "É uma propriedade mecânica, não uma classificação estética do cabelo.",
    ],
    limitations:
      "Puxar um fio com os dedos não produz uma medição padronizada. Resultados caseiros devem ser tratados apenas como observação aproximada.",
    commonlyFoundIn: ["avaliação de fibra", "conteúdo técnico", "pesquisa capilar"],
    related: ["quebra-capilar", "porosidade-capilar", "cuticula-capilar"],
    references: [ROBBINS],
  },
  {
    slug: "quebra-capilar",
    name: "Quebra capilar",
    category: "Comportamento da fibra",
    summary:
      "Ruptura do fio ao longo do comprimento. É diferente de queda a partir da raiz e pode estar associada a fragilidade, atrito, tensão e histórico de dano.",
    whatItDoes: [
      "Ajuda a diferenciar perda por ruptura do fio de queda capilar.",
      "Pode indicar necessidade de reduzir atrito, tração e agressões adicionais.",
      "Pode ser considerada junto com dano químico, térmico e mecânico.",
    ],
    limitations:
      "A observação visual nem sempre distingue quebra de queda com segurança. Queda intensa ou súbita merece avaliação profissional.",
    commonlyFoundIn: ["análises de dano", "rotinas de proteção", "conteúdo técnico"],
    related: ["elasticidade-capilar", "atrito-capilar", "porosidade-capilar"],
    references: [ROBBINS],
  },
  {
    slug: "frizz",
    name: "Frizz",
    category: "Comportamento da fibra",
    summary:
      "Termo descritivo para fios que se afastam do conjunto ou apresentam desalinhamento visível. Pode ter múltiplas causas e não é, por si só, sinal de dano.",
    whatItDoes: [
      "Pode aumentar com umidade ambiental, atrito, eletricidade estática ou diferença de curvatura entre fios.",
      "Pode ser reduzido por condicionamento, lubrificação e formação de filme, dependendo da fórmula e do objetivo.",
      "Pode fazer parte do comportamento natural de diferentes texturas de cabelo.",
    ],
    limitations:
      "Frizz não deve ser usado como sinônimo automático de ressecamento, porosidade ou dano. O contexto da fibra e do ambiente importa.",
    commonlyFoundIn: ["finalizadores", "leave-ins", "séruns", "conteúdo de rotina"],
    related: ["formador-de-filme", "condicionante-cationico", "atrito-capilar"],
    references: [ROBBINS, BAREL],
  },
  {
    slug: "cuticula-capilar",
    name: "Cutícula capilar",
    category: "Estrutura do fio",
    summary:
      "Camada mais externa da fibra capilar, formada por células sobrepostas que ajudam a proteger estruturas internas do fio.",
    whatItDoes: [
      "Participa da interação da fibra com água, atrito e ingredientes condicionantes.",
      "Alterações e desgaste da superfície podem modificar brilho, atrito e penteabilidade.",
      "É uma estrutura física da fibra, não algo que possa ser ‘aberto’ e ‘fechado’ como uma porta de forma literal.",
    ],
    limitations:
      "Expressões como ‘selar a cutícula’ são simplificações de linguagem cosmética. O efeito real de produtos na superfície é temporário e depende da formulação.",
    commonlyFoundIn: ["anatomia do fio", "pesquisa capilar", "conteúdo técnico"],
    related: ["porosidade-capilar", "atrito-capilar", "formador-de-filme"],
    references: [ROBBINS],
  },
  {
    slug: "atrito-capilar",
    name: "Atrito capilar",
    category: "Propriedade da fibra",
    summary:
      "Resistência ao deslizamento entre fios ou entre o cabelo e outras superfícies. Atrito elevado pode aumentar esforço de penteado e desgaste mecânico.",
    whatItDoes: [
      "Ajuda a explicar por que condicionantes e lubrificantes podem facilitar desembaraço.",
      "Pode aumentar com superfícies mais ásperas e durante manipulação intensa.",
      "É relevante para proteção mecânica e penteabilidade.",
    ],
    limitations:
      "A sensação de aspereza é subjetiva e não mede atrito de forma instrumental. A formulação e o estado da fibra influenciam a percepção.",
    commonlyFoundIn: ["condicionadores", "leave-ins", "estudos de penteabilidade"],
    related: ["condicionante-cationico", "formador-de-filme", "quebra-capilar"],
    references: [ROBBINS, DSOUZA_RATHI],
  },
  {
    slug: "penteabilidade",
    name: "Penteabilidade",
    category: "Comportamento da fibra",
    summary:
      "Facilidade com que o cabelo pode ser penteado ou desembaraçado, seco ou molhado, com menor resistência e força aplicada.",
    whatItDoes: [
      "É influenciada por atrito, emaranhamento, condicionamento e estado da superfície do fio.",
      "Pode melhorar com agentes catiônicos, emolientes e formadores de filme adequados.",
      "É uma característica funcional frequentemente avaliada em produtos condicionantes.",
    ],
    limitations:
      "Penteabilidade não depende de um único ativo e pode variar com técnica, ferramenta, densidade e textura do cabelo.",
    commonlyFoundIn: ["condicionadores", "máscaras", "leave-ins", "testes cosméticos"],
    related: ["atrito-capilar", "condicionante-cationico", "quebra-capilar"],
    references: [ROBBINS, DSOUZA_RATHI],
  },
  {
    slug: "couro-cabeludo",
    name: "Couro cabeludo",
    category: "Couro cabeludo",
    summary:
      "Pele que recobre o crânio e onde estão os folículos pilosos. Necessidades do couro cabeludo não devem ser confundidas automaticamente com necessidades do comprimento do fio.",
    whatItDoes: [
      "Pode apresentar oleosidade, ressecamento, sensibilidade ou irritação independentemente do comprimento.",
      "Ajuda a separar decisões de limpeza da raiz de decisões de condicionamento do comprimento.",
      "Sinais persistentes ou intensos podem exigir avaliação profissional.",
    ],
    limitations:
      "O glossário oferece informação cosmética e não diagnostica doenças do couro cabeludo.",
    commonlyFoundIn: ["shampoos", "loções para couro cabeludo", "conteúdo de cuidados"],
    related: ["sensibilidade-do-couro-cabeludo", "inci"],
    references: [DSOUZA_RATHI],
  },
  {
    slug: "sensibilidade-do-couro-cabeludo",
    name: "Sensibilidade do couro cabeludo",
    category: "Couro cabeludo",
    summary:
      "Relato de desconforto, ardor, coceira ou reatividade na pele do couro cabeludo. É um sinal de atenção, não um diagnóstico específico.",
    whatItDoes: [
      "Pode justificar cautela ao introduzir novos produtos.",
      "Ajuda a priorizar fórmulas e rotinas mais simples enquanto o desconforto é investigado.",
      "Pode exigir avaliação profissional quando é intensa, persistente ou acompanhada de feridas, dor ou queda súbita.",
    ],
    limitations:
      "Sintomas semelhantes podem ter causas diferentes. O questionário e o glossário não identificam a causa clínica.",
    commonlyFoundIn: ["avaliação de segurança", "cuidados do couro cabeludo"],
    related: ["couro-cabeludo", "inci"],
    references: [DSOUZA_RATHI],
  },
  {
    slug: "inci",
    name: "INCI",
    category: "Termo técnico",
    summary:
      "International Nomenclature of Cosmetic Ingredients: sistema padronizado de nomes usado para declarar ingredientes cosméticos nos rótulos.",
    whatItDoes: [
      "Ajuda a reconhecer um mesmo ingrediente em diferentes produtos e marcas.",
      "Permite comparar listas de ingredientes de forma mais consistente.",
      "É a linguagem usada pelo glossário para identificar ingredientes.",
    ],
    limitations:
      "A lista INCI informa quais ingredientes estão declarados, mas normalmente não revela as concentrações exatas nem permite prever sozinha o desempenho da fórmula.",
    commonlyFoundIn: ["rótulos de produtos cosméticos"],
    related: ["umectante", "emoliente", "condicionante-cationico"],
    references: [BAREL],
  },
 ];

const glossaryLocalizations: Record<string, {
  pt?: string;
  en?: string;
  es?: string;
  aliases?: string[];
}> = {
  glycerin: { pt: "Glicerina", en: "Glycerin", es: "Glicerina", aliases: ["glicerol", "glycerol"] },
  panthenol: { pt: "Pantenol", en: "Panthenol", es: "Pantenol", aliases: ["pro-vitamina b5", "provitamina b5", "pro-vitamin b5"] },
  propanediol: { pt: "Propanodiol", en: "Propanediol", es: "Propanodiol" },
  "caprylic-capric-triglyceride": { pt: "Triglicerídeo caprílico/cáprico", en: "Caprylic/Capric Triglyceride", es: "Triglicérido caprílico/cáprico" },
  "coco-caprylate-caprate": { pt: "Coco-caprilato/caprato", en: "Coco-Caprylate/Caprate", es: "Coco-caprilato/caprato" },
  "behentrimonium-chloride": { pt: "Cloreto de behentrimônio", en: "Behentrimonium Chloride", es: "Cloruro de behentrimonio" },
  "cetrimonium-chloride": { pt: "Cloreto de cetrimônio", en: "Cetrimonium Chloride", es: "Cloruro de cetrimonio" },
  "behentrimonium-methosulfate": { pt: "Metossulfato de behentrimônio", en: "Behentrimonium Methosulfate", es: "Metosulfato de behentrimonio", aliases: ["btms"] },
  "cetearyl-alcohol": { pt: "Álcool cetoestearílico", en: "Cetearyl Alcohol", es: "Alcohol cetoestearílico" },
  "cetyl-alcohol": { pt: "Álcool cetílico", en: "Cetyl Alcohol", es: "Alcohol cetílico" },
  "stearyl-alcohol": { pt: "Álcool estearílico", en: "Stearyl Alcohol", es: "Alcohol estearílico" },
  amodimethicone: { pt: "Amodimeticona", en: "Amodimethicone", es: "Amodimeticona" },
  dimethicone: { pt: "Dimeticona", en: "Dimethicone", es: "Dimeticona" },
  "hydrolyzed-keratin": { pt: "Queratina hidrolisada", en: "Hydrolyzed Keratin", es: "Queratina hidrolizada" },
  "hydrolyzed-wheat-protein": { pt: "Proteína de trigo hidrolisada", en: "Hydrolyzed Wheat Protein", es: "Proteína de trigo hidrolizada" },
  "hydrolyzed-rice-protein": { pt: "Proteína de arroz hidrolisada", en: "Hydrolyzed Rice Protein", es: "Proteína de arroz hidrolizada" },
  umectante: { pt: "Umectante", en: "Humectant", es: "Humectante" },
  emoliente: { pt: "Emoliente", en: "Emollient", es: "Emoliente" },
  "condicionante-cationico": { pt: "Condicionante catiônico", en: "Cationic conditioner", es: "Acondicionador catiónico" },
  "alcool-graxo": { pt: "Álcool graxo", en: "Fatty alcohol", es: "Alcohol graso" },
  "formador-de-filme": { pt: "Formador de filme", en: "Film former", es: "Formador de película" },
  inci: { pt: "INCI", en: "INCI", es: "INCI", aliases: ["international nomenclature of cosmetic ingredients", "nomenclatura internacional de ingredientes cosméticos"] },
  "porosidade-capilar": { pt: "Porosidade capilar", en: "Hair porosity", es: "Porosidad capilar", aliases: ["porosidade", "porosity", "porosidad", "alta porosidade", "baixa porosidade"] },
  "retencao-de-umidade": { pt: "Retenção de umidade", en: "Moisture retention", es: "Retención de humedad", aliases: ["retenção", "retencao", "umidade", "moisture"] },
  "elasticidade-capilar": { pt: "Elasticidade capilar", en: "Hair elasticity", es: "Elasticidad capilar", aliases: ["elasticidade", "elasticity", "elasticidad"] },
  "quebra-capilar": { pt: "Quebra capilar", en: "Hair breakage", es: "Rotura capilar", aliases: ["quebra", "breakage", "rotura"] },
  frizz: { pt: "Frizz", en: "Frizz", es: "Frizz", aliases: ["arrepiado", "arrepiados"] },
  "cuticula-capilar": { pt: "Cutícula capilar", en: "Hair cuticle", es: "Cutícula capilar", aliases: ["cutícula", "cuticula", "cuticle"] },
  "atrito-capilar": { pt: "Atrito capilar", en: "Hair friction", es: "Fricción capilar", aliases: ["atrito", "friction", "fricción"] },
  penteabilidade: { pt: "Penteabilidade", en: "Combability", es: "Peinabilidad", aliases: ["desembaraço", "desembaraco", "combability", "detangling"] },
  "couro-cabeludo": { pt: "Couro cabeludo", en: "Scalp", es: "Cuero cabelludo", aliases: ["scalp"] },
  "sensibilidade-do-couro-cabeludo": { pt: "Sensibilidade do couro cabeludo", en: "Scalp sensitivity", es: "Sensibilidad del cuero cabelludo", aliases: ["sensibilidade", "ardor", "coceira", "scalp sensitivity"] },
};

export const glossaryEntries: GlossaryEntry[] =
  baseGlossaryEntries.map((entry) => {
    const localization =
      glossaryLocalizations[entry.slug];

    return {
      ...entry,
      name: localization?.pt ?? entry.name,
      englishName: localization?.en ?? entry.englishName ?? entry.name,
      spanishName: localization?.es ?? entry.spanishName,
      aliases: [
        ...(entry.aliases ?? []),
        ...(localization?.aliases ?? []),
      ],
    };
  });

export function getGlossaryEntry(
  slug: string,
): GlossaryEntry | undefined {
  return glossaryEntries.find(
    (entry) => entry.slug === slug,
  );
}

export function normalizeGlossaryLabel(
  value: string,
): string {
  return value
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9/+-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getGlossarySearchValues(
  entry: GlossaryEntry,
): string[] {
  return [
    entry.name,
    entry.inciName ?? "",
    entry.englishName ?? "",
    entry.spanishName ?? "",
    entry.category,
    entry.summary,
    ...(entry.aliases ?? []),
  ].filter(Boolean);
}

export function getGlossaryEntryByLabel(
  label: string,
): GlossaryEntry | undefined {
  const normalized =
    normalizeGlossaryLabel(label);

  return glossaryEntries.find(
    (entry) =>
      getGlossarySearchValues(entry).some(
        (value) =>
          normalizeGlossaryLabel(value) ===
          normalized,
      ),
  );
}
