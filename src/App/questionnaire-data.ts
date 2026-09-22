import type {
  QuestionnaireQuestion,
} from "../domain/questionnaire";

export const questionnaireQuestions:
  QuestionnaireQuestion[] = [
    // 1 — Fiber behaviour

    {
      id: "roughness",
      text:
        "Como seu cabelo fica após a lavagem?",
      type: "single_choice",
      domain: "fiber",
      trait: "post_wash_roughness",
      region: "mid_length",
      options: [
        {
          label: "Pouco áspero",
          value: "low",
        },
        {
          label: "Moderadamente áspero",
          value: "medium",
        },
        {
          label: "Muito áspero",
          value: "high",
        },
      ],
    },

    {
      id: "tangling",
      text:
        "Quanto seu cabelo embaraça quando está molhado?",
      type: "single_choice",
      domain: "fiber",
      trait: "wet_tangling",
      region: "mid_length",
      options: [
        {
          label: "Pouco",
          value: "low",
        },
        {
          label: "Moderadamente",
          value: "medium",
        },
        {
          label: "Muito",
          value: "high",
        },
      ],
    },

    {
      id: "conditioning",
      text:
        "Quanto seu cabelo melhora com condicionador ou máscara?",
      type: "single_choice",
      domain: "product_response",
      trait:
        "conditioning_improvement",
      region: "mid_length",
      options: [
        {
          label: "Pouco",
          value: "low",
        },
        {
          label: "Moderadamente",
          value: "medium",
        },
        {
          label: "Muito",
          value: "high",
        },
      ],
    },

    {
      id: "breakage",
      text:
        "Você percebe quebra no comprimento do cabelo?",
      type: "single_choice",
      domain: "fiber",
      trait: "breakage",
      region: "mid_length",
      options: [
        {
          label:
            "Não percebo ou percebo muito pouca quebra",
          value: "low",
        },
        {
          label:
            "Percebo alguma quebra",
          value: "medium",
        },
        {
          label:
            "Percebo muita quebra",
          value: "high",
        },
        {
          label:
            "Não sei diferenciar quebra de queda",
          value: "unknown",
        },
      ],
      helpText:
        "Quebra acontece quando o fio se parte ao longo do comprimento. Se não conseguir diferenciar de queda, escolha a opção de dúvida.",
    },

    // 2 — Water behaviour

    {
      id: "wetting_speed",
      text:
        "Quando você molha o cabelo, quanto tempo ele leva para ficar completamente molhado?",
      type: "single_choice",
      domain: "fiber",
      trait: "wetting_speed",
      region: "mid_length",
      options: [
        {
          label:
            "Fica completamente molhado rapidamente",
          value: "fast",
        },
        {
          label:
            "Leva um tempo intermediário",
          value: "normal",
        },
        {
          label:
            "Demora bastante para ficar completamente molhado",
          value: "slow",
        },
        {
          label: "Não sei perceber",
          value: "unknown",
        },
      ],
    },

    {
      id: "drying_speed",
      text:
        "Quando seca naturalmente, quanto tempo seu cabelo costuma levar para secar completamente?",
      type: "single_choice",
      domain: "fiber",
      trait: "drying_speed",
      region: "mid_length",
      options: [
        {
          label: "Seca rapidamente",
          value: "fast",
        },
        {
          label:
            "Leva um tempo intermediário",
          value: "normal",
        },
        {
          label:
            "Demora bastante para secar",
          value: "slow",
        },
        {
          label: "Não sei perceber",
          value: "unknown",
        },
      ],
      helpText:
        "Considere a secagem natural, sem secador ou outra fonte de calor.",
    },

    {
      id: "water_retention",
      text:
        "Depois de molhado, como seu cabelo costuma manter a sensação de umidade?",
      type: "single_choice",
      domain: "fiber",
      trait: "water_retention",
      region: "mid_length",
      options: [
        {
          label:
            "Perde a sensação de umidade rapidamente",
          value: "low",
        },
        {
          label:
            "Mantém por um tempo intermediário",
          value: "medium",
        },
        {
          label:
            "Permanece com sensação de umidade por bastante tempo",
          value: "high",
        },
        {
          label: "Não sei perceber",
          value: "unknown",
        },
      ],
    },

    // 3 — History

    {
      id: "chemical_processing",
      text:
        "Com que intensidade seu cabelo tem sido exposto a processos químicos?",
      type: "single_choice",
      domain: "history",
      trait: "chemical_processing",
      region: "all",
      options: [
        {
          label:
            "Nenhuma ou pouca exposição",
          value: "low",
        },
        {
          label:
            "Exposição moderada",
          value: "medium",
        },
        {
          label:
            "Exposição frequente ou intensa",
          value: "high",
        },
      ],
      helpText:
        "Considere coloração, descoloração, alisamento, relaxamento e outros processos químicos.",
    },

    {
      id: "heat_exposure",
      text:
        "Com que frequência seu cabelo é exposto a fontes de calor?",
      type: "single_choice",
      domain: "history",
      trait: "heat_exposure",
      region: "all",
      options: [
        {
          label:
            "Nunca ou raramente",
          value: "low",
        },
        {
          label: "Às vezes",
          value: "medium",
        },
        {
          label: "Com frequência",
          value: "high",
        },
      ],
      helpText:
        "Considere secador quente, chapinha, modelador ou outras ferramentas térmicas.",
    },

    {
      id: "damage_history",
      text:
        "Você já percebeu uma mudança importante no cabelo após química, calor ou outro processo?",
      type: "single_choice",
      domain: "history",
      trait: "damage_history",
      region: "all",
      options: [
        {
          label:
            "Não percebi mudança importante",
          value: "none",
        },
        {
          label:
            "Percebi uma mudança leve",
          value: "mild",
        },
        {
          label:
            "Percebi uma mudança moderada",
          value: "moderate",
        },
        {
          label:
            "Percebi uma mudança intensa",
          value: "severe",
        },
      ],
    },

    // 4 — Scalp / safety

    {
      id: "scalp_sensitivity",
      text:
        "Com que frequência seu couro cabeludo apresenta coceira ou sensibilidade?",
      type: "single_choice",
      domain: "scalp",
      trait: "scalp_sensitivity",
      region: "scalp",
      options: [
        {
          label:
            "Nunca ou quase nunca",
          value: "none",
        },
        {
          label: "Às vezes",
          value: "mild",
        },
        {
          label: "Com frequência",
          value: "moderate",
        },
        {
          label:
            "Com muita frequência ou intensidade",
          value: "severe",
        },
      ],
      helpText:
        "Considere como seu couro cabeludo costuma se comportar, não apenas hoje.",
    },

    {
      id: "scalp_burning",
      text:
        "Você sente ardor intenso no couro cabeludo?",
      type: "single_choice",
      domain: "scalp",
      trait: "scalp_burning",
      region: "scalp",
      options: [
        {
          label: "Não",
          value: "none",
        },
        {
          label: "Leve",
          value: "mild",
        },
        {
          label: "Moderado",
          value: "moderate",
        },
        {
          label: "Intenso",
          value: "severe",
        },
      ],
    },

    {
      id: "scalp_wound",
      text:
        "Você percebe feridas abertas no couro cabeludo?",
      type: "single_choice",
      domain: "scalp",
      trait: "scalp_wound",
      region: "scalp",
      options: [
        {
          label: "Não",
          value: "none",
        },
        {
          label:
            "Sim, de forma leve ou localizada",
          value: "mild",
        },
        {
          label:
            "Sim, de forma importante",
          value: "severe",
        },
      ],
    },

    {
      id: "sudden_hair_loss",
      text:
        "Você percebeu um aumento súbito ou muito diferente do habitual na queda de cabelo?",
      type: "single_choice",
      domain: "scalp",
      trait: "sudden_hair_loss",
      region: "scalp",
      options: [
        {
          label: "Não",
          value: "none",
        },
        {
          label:
            "Talvez, mas não tenho certeza",
          value: "mild",
        },
        {
          label:
            "Sim, percebi aumento importante",
          value: "severe",
        },
      ],
    },

    // 5 — Current routine

    {
      id: "wash_frequency",
      text:
        "Com que frequência você costuma lavar o cabelo?",
      type: "single_choice",
      domain: "routine",
      trait: "wash_frequency",
      region: "all",
      options: [
        {
          label:
            "Uma vez por semana ou menos",
          value: "rarely",
        },
        {
          label:
            "Algumas vezes por semana",
          value: "sometimes",
        },
        {
          label:
            "Quase todos os dias",
          value: "frequently",
        },
        {
          label: "Todos os dias",
          value: "daily",
        },
      ],
    },

    {
      id: "conditioning_frequency",
      text:
        "Com que frequência você usa condicionador ou máscara?",
      type: "single_choice",
      domain: "routine",
      trait: "conditioning_frequency",
      region: "mid_length",
      options: [
        {
          label:
            "Nunca ou raramente",
          value: "rarely",
        },
        {
          label:
            "Em algumas lavagens",
          value: "sometimes",
        },
        {
          label:
            "Na maioria das lavagens",
          value: "frequently",
        },
        {
          label:
            "Sempre que lavo",
          value: "daily",
        },
      ],
    },

    {
      id: "styling_frequency",
      text:
        "Com que frequência você usa produtos para finalizar o cabelo?",
      type: "single_choice",
      domain: "routine",
      trait: "styling_frequency",
      region: "all",
      options: [
        {
          label:
            "Nunca ou raramente",
          value: "rarely",
        },
        {
          label: "Às vezes",
          value: "sometimes",
        },
        {
          label:
            "Com frequência",
          value: "frequently",
        },
        {
          label:
            "Praticamente todos os dias",
          value: "daily",
        },
      ],
    },

    // 6 — Goal and preferences

    {
      id: "primary_goal",
      text:
        "Qual é sua principal prioridade para o cabelo neste momento?",
      type: "single_choice",
      domain: "goal",
      trait: "primary_goal",
      region: "all",
      options: [
        {
          label: "Reduzir quebra",
          value: "reduce_breakage",
        },
        {
          label:
            "Melhorar maciez e toque",
          value: "improve_softness",
        },
        {
          label: "Controlar frizz",
          value: "control_frizz",
        },
        {
          label:
            "Melhorar definição",
          value: "improve_definition",
        },
        {
          label:
            "Manter comprimento e reduzir perdas",
          value: "retain_length",
        },
        {
          label:
            "Simplificar minha rotina",
          value: "simplify_routine",
        },
      ],
      helpText:
        "Escolha a prioridade mais importante agora. Isso personaliza as recomendações, mas não é usado como diagnóstico.",
    },

    {
      id: "routine_complexity",
      text:
        "Que tipo de rotina você prefere manter?",
      type: "single_choice",
      domain: "preference",
      trait: "routine_complexity",
      region: "all",
      options: [
        {
          label:
            "Mínima — quero usar o menor número possível de produtos",
          value: "minimal",
        },
        {
          label:
            "Equilibrada — aceito alguns passos quando fazem diferença",
          value: "balanced",
        },
        {
          label:
            "Completa — não me importo com vários passos",
          value: "complete",
        },
      ],
    },

    {
      id: "budget_priority",
      text:
        "Como o preço deve influenciar as sugestões de produtos?",
      type: "single_choice",
      domain: "preference",
      trait: "budget_priority",
      region: "all",
      options: [
        {
          label:
            "Quero priorizar sempre as opções mais baratas",
          value: "lowest_price",
        },
        {
          label:
            "Quero priorizar custo-benefício",
          value: "cost_benefit",
        },
        {
          label:
            "O preço pode ser mais flexível",
          value: "flexible",
        },
      ],
    },
  ];