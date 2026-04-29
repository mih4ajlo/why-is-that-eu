---
title: "Proposal for a Directive on adapting non-contractual civil liability rules to artificial intelligence (AI Liability Directive)"
category: "Digital & Data"
year: 2022
tags: [ai-liability, civil-liability, consumer-protection, burden-of-proof, algorithmic-harm, digital-policy]
summary: "The AI Liability Directive proposes rules for who must prove fault when an AI system causes harm, lowering the burden of proof for victims in certain high-risk cases."
status: "proposed"
related: ["2016/679/EU", "2022/2555/EU"]
llm: "deepseek-chat"
---

## What is it?

The AI Liability Directive is a European Commission proposal from September 2022 that seeks to harmonise how national courts handle civil claims for damages caused by AI systems. It does not create new AI-specific offences, but rather adapts existing national liability rules to address the unique challenges of proving fault when algorithms, sensors, and machine-learning models produce harmful outcomes.

The core innovation is a "rebuttable presumption of causality" in certain cases: if a victim can show that someone failed to comply with requirements under the proposed AI Act (like transparency or human oversight obligations), and that the AI system caused harm, the court may presume there is a causal link. The defendant can still rebut this presumption by proving other factors caused the harm. The directive also gives courts the power to order disclosure of evidence about high-risk AI systems from providers or users, subject to protection of trade secrets and proportionality.

## Why was it introduced?

The directive's origin lies in a structural tension that became visible around 2016–2018: existing product liability law, designed for physical goods with deterministic failures, was ill-equipped for AI systems that change behaviour through learning, have "black-box" decision-making, and involve multiple actors (developer, deployer, user, data supplier). The European Parliament’s Legal Affairs Committee first flagged this in its 2016 report on civil law rules for robotics, chaired by MEP Mady Delvaux (S&D), which warned that existing liability frameworks "may be inadequate" for autonomous systems.

The political breakthrough came after a series of concrete AI failures that made the liability gap tangible. In 2018, the fatal crash of an Uber self-driving test vehicle in Tempe, Arizona — where the system identified a pedestrian but did not brake — triggered internal Commission discussions about whether EU law could handle such cases. More broadly, industry surveys from 2019–2021, including a 2020 study by the Commission’s Joint Research Centre, found that 54% of EU businesses cited legal uncertainty over liability as a barrier to adopting AI.

The coalition that pushed the directive forward was unusual. Consumer organisations (BEUC, 2021 position paper) wanted strong victim protections. Tech industry associations (DigitalEurope, 2021) initially opposed any new liability rules, warning of innovation chill, but shifted position after the 2020 White Paper on AI proposed a risk-based approach that would limit new obligations to high-risk systems. The real driver was insurance companies: Insurance Europe, in a 2019 paper, argued that without clear liability rules, they could not price AI-related risk, making AI insurance unavailable for businesses.

The Commission under Ursula von der Leyen made AI liability part of its 2020 White Paper on AI, then included the directive in the 2021 AI package alongside the AI Act. Commissioners Margrethe Vestager (Competition, digital) and Thierry Breton (Internal Market) split the portfolio — Vestager’s team drafted the AI Act for safety and transparency, while Breton’s team drafted the liability directive for civil remedies. The timing was shaped by the 2020–2021 COVID-19 pandemic, which accelerated digitalisation: a Eurobarometer survey from early 2022 found 75% of EU citizens wanted rapid regulation of AI safety, and 68% worried about not being compensated for AI-caused harm.

## Timeline

- **2016 May** — European Parliament resolution on civil law rules for robotics (Delvaux report) flags liability gap for autonomous systems
- **2020 February** — Commission White Paper on AI proposes risk-based regulatory framework and announces future liability legislation
- **2020 October** — European Parliament resolution AI in civil and criminal liability calls for strict liability for certain AI risks
- **2021 April** — Commission publishes AI Act proposal (COM/2021/206) as regulatory framework; liability directive delayed
- **2022 September 28** — Commission publishes AI Liability Directive proposal (COM/2022/496) alongside revised Product Liability Directive
- **2023 March** — European Economic and Social Committee adopts opinion supporting the directive with amendments
- **2023 October** — European Parliament's JURI committee adopts report with 36 amendments, including widening scope to all AI systems not just high-risk
- **2024 January** — Council of the EU reaches general approach, narrowing disclosure provisions and limiting presumption of causality to high-risk AI only
- **2024 March** — Trilogues begin between Parliament, Council, and Commission
- **2024 June** — Trilogues stalled over scope of disclosure obligations and trade secrets
- **2025** — Entry into force expected (if adopted), with 24-month transposition period for member states

## Impact and consequences

If adopted, the directive will affect primarily two groups: providers and users of high-risk AI systems (such as medical diagnostic tools, recruitment algorithms, and critical infrastructure) and victims harmed by them. The Commission’s 2022 impact assessment estimated the directive would reduce litigation costs for victims by 25–40% per case, while increasing compliance costs for AI developers by around €1–2 million per year for large providers.

The most contentious provision is the disclosure of evidence. The Parliament’s version allows victims to request any relevant evidence from any defendant, while the Council’s version limits this to high-risk AI systems and protects trade secrets through in-camera review. Insurance Europe estimated in 2022 that without the directive, up to 30% of AI-related liability claims would go uninsured due to uncertainty.

Member states are divided: Germany, through the Federal Ministry of Justice (2023 statement), argued for limiting the directive to high-risk AI only, citing constitutional concerns about reversing the burden of proof. France and Sweden pushed for broader disclosure powers. The directive’s final shape will determine whether the EU's approach becomes a global model — similar efforts are underway in Japan (2023 AI Liability Guidelines) and Canada (2022 proposed AI and Data Act includes liability provisions).

## Key questions answered

### Can someone sue an AI company for damages in the EU under current rules?

Yes, but the victim faces a very high evidentiary burden. Under existing national product liability laws (based on the 1985 Product Liability Directive) and general tort law, the person claiming damages must prove a causal link between a defect in the product and the harm. For AI systems — which are often "black boxes" where even developers cannot explain exactly why a particular output occurred — this is almost impossible without access to the source code, training data, and system logs. The proposed AI Liability Directive would help by shifting the burden to defendants in certain high-risk cases and giving courts powers to order disclosure of evidence.

### What kinds of harms would the AI Liability Directive cover?

The directive covers all types of harm that existing national liability laws already address: death, personal injury, damage to property, and — where national law allows — non-material damage like emotional distress or loss of privacy. It does not create any new type of compensable harm. The key change is about *proof* of causation, not about what counts as harm. So a patient injured by a misdiagnosis from an AI-powered medical scanner could use the directive, but the types of damage they can claim depend on the country where they sue.

### Does the directive apply to all AI or only "high-risk" systems?

The Commission's original proposal applied only to AI systems classified as "high-risk" under the proposed AI Act (such as those used in critical infrastructure, law enforcement, or recruitment). The European Parliament's JURI committee voted in October 2023 to expand this to all AI systems, but the Council of the EU (member states) insisted on limiting the presumption of causality to high-risk AI only. As of 2024, the final scope is still under negotiation in trilogues.

### Why does proving AI liability need special EU rules instead of normal court procedures?

Because AI systems present three fundamental challenges to normal tort law: *opacity* (decisions are made through complex neural networks that people cannot explain), *autonomy* (the system behaves differently in the real world than its training data predicted), and *multiplicity of actors* (the harm could result from data providers, the developer, the deployer, or the end user). The Commission noted in its 2022 impact assessment that existing product liability law assumed "static, deterministic products" — a toaster either works or it doesn't. AI systems that "learn" after deployment break that model entirely, making it near-impossible for victims to identify which actor caused the harm.

## Official sources

- [Proposal for an AI Liability Directive (COM/2022/496)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022PC0496)
- [Commission Q&A on AI Liability Directive](https://ec.europa.eu/commission/presscorner/detail/en/qanda_22_5792)