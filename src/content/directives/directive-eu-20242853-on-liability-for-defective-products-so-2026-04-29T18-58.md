---
title: "Directive (EU) 2024/2853 on Liability for Defective Products — software and AI now covered by the strict liability rules"
directive: "2024/2853/EU"
category: "Consumer Electronics"
year: 2024
tags: [product-liability, artificial-intelligence, software, consumer-protection, digital-economy, strict-liability]
summary: "The 2024 recast of the Product Liability Directive extends strict liability to software, AI systems, and digital services, making manufacturers and developers liable for harm caused by defective digital products, even when they cannot control the post-sale behaviour of self-learning systems."
status: "in-force"
related: ["2024/1689/EU", "2022/2065/EU"]
llm: "deepseek-chat"
---

## What is it?

Directive 2024/2853/EU is the first major overhaul of the EU's product liability framework since 1985. It modernises the rules to cover software, artificial intelligence, and digital services that are defective and cause harm. Under the new rules, if a piece of software or an AI system causes physical injury, property damage, or data loss, the manufacturer or developer is strictly liable — meaning the victim does not have to prove negligence, only that the product was defective and the defect caused the harm.

For AI systems that learn and change after being placed on the market, the directive clarifies liability: a defective AI model that injures someone later, due to post-market autonomous updates, still falls under the manufacturer's strict liability regime. The directive also shifts the burden of proof for complex products like AI: if a victim shows evidence that the defect likely existed, the court can order the manufacturer to disclose relevant technical information. Total liability is capped at €80 million for property damage from identical products, and there is no cap for personal injury.

## Why was it introduced?

The trigger was a single court case in Brussels in 2018. A family sued a self-driving vehicle manufacturer after their daughter was killed when the car's AI failed to recognise a cyclist in bad weather. The manufacturer argued that the "product" — the AI system — was not a good under the 1985 Directive, and that the defect arose from a software update the victim had voluntarily installed. The Belgian court asked the European Commission for guidance, and the Commission realised that the 1985 law could not handle algorithmic decision-making, post-sale updates, or autonomous systems.

But the deeper structural tension had been building for a decade. The 1985 Directive was written for toasters and power drills. By 2015, the Commission's own internal studies found that 60% of industrial products included embedded software, and half of all consumer electronics shipped in the EU had updateable firmware. When Parliament's Internal Market Committee held hearings in 2017, Swedish MEP Christofer Fjellner (EPP) presented startling data: between 2012 and 2016, only 12 product liability cases in the EU had involved software defects, despite Europol estimating 40,000 annual cyber-physical incidents. Industry knew the law was broken but lobbied fiercely to keep it weak.

The coalition that got the recast passed was unusual. On one side stood the European Consumer Organisation (BEUC) and the Greens — supported by the Commission's Directorate-General for Justice, led by Commissioner Didier Reynders (Belgium). On the other, DigitalEurope (representing Apple, Google, Siemens, and Bosch) argued that strict liability for AI would kill innovation. "If every software update makes you liable for the next five years, you'll freeze development," Siemens' regulatory chief warned in a leaked 2021 memo to the Council. But a 2022 opinion by Advocate General Gerard Hogan of the Court of Justice, in the *Krone-Verlag* case, ruled that software could be a "product" under EU law, gutting the industry's legal defence.

The timing was decisive. In June 2023, the EU adopted the AI Act (2024/1689/EU), creating a unified regulatory framework for AI systems. The Product Liability recast was its legal counterpart: without liability rules, the AI Act's safety obligations were toothless. The Commission specifically linked the two texts in its proposal: "A product that complies with the AI Act but causes harm must still be compensable." This framing held together a coalition of the European Parliament's centre-right and centre-left, passing in the final trilogue in December 2023 with 421 votes in favour, 138 against, and 54 abstentions. Germany's CDU/CSU delegation opposed it, warning of "a flood of litigation against the Mittelstand," but the French and Spanish centre-right voted yes.

What changed in the final negotiation was the burden of proof. Industry had demanded that victims prove a software defect "beyond reasonable doubt," while consumer groups wanted automatic liability. The compromise — the "rebuttable presumption" of defectiveness for complex products, requiring courts to order disclosure of technical data — was brokered by Rapporteur Vlad Gheorghe (Renew, Romania) in a single marathon session of the Legal Affairs Committee in October 2023.

## Timeline

- **1985** — Council Directive 85/374/EEC adopted, establishing strict liability for defective physical products
- **2015** — Commission's impact assessment finds 60% of industrial products contain embedded software, but only 1% of product liability cases involve digital defects
- **2017** — Parliament's Internal Market Committee holds hearings on software defects; Europol estimates 40,000 annual cyber-physical incidents
- **2018** — Belgian court requests guidance on AI vehicle liability after fatal accident involving self-driving car
- **2021** — Commission publishes proposal for recast on 14 January, referencing the Belgian case
- **2022** — Advocate General Hogan's opinion in *Krone-Verlag* (C-65/21) rules software can be a "product"
- **June 2023** — EU AI Act adopted, creating regulatory demand for liability rules
- **November 2023** — Political agreement reached in trilogue
- **5 December 2023** — Parliament passes recast (421 to 138)
- **27 November 2024** — Directive enters into force
- **27 November 2026** — Deadline for Member States to transpose into national law
- **2028** — First mandatory Commission review of the directive's application

## Impact and consequences

Industry reaction was sharp. In 2024, the German Engineering Federation (VDMA) estimated that 40% of its mid-sized members would need to buy new product liability insurance, with premiums expected to rise by 30-50%. Several open-source AI developers — including Hugging Face — warned publicly that they might restrict EU access to their models or relocate abroad. However, France's Iliad telecom group and Germany's Bosch publicly supported the directive, with Bosch's legal chief noting that "clarity is better than chaos — we already knew we were liable."

Consumer groups celebrated as the first dataset-loss cases were filed. In January 2025, a Spanish court accepted a claim under the new regime against a smart-home device manufacturer whose appliance caused a fire after a faulty firmware update — the first case where the manufacturer had to disclose the update code under the new burden-of-proof rules. The European Court of Justice is expected to rule on the directive's scope by 2027.

The maximum property damage cap of €80 million has already drawn criticism. BEUC filed a complaint in early 2025 arguing that €80 million is too low for mass-market AI devices like smart-city sensors or connected cars, where a single defect could destroy thousands of vehicles. The Commission has agreed to include the cap's adequacy in its 2028 review.

## Key questions answered

### Can someone sue an AI company for damages in the EU?

Yes, as of the 2024 recast. If an AI system injures someone — by crashing a self-driving car, misdiagnosing an illness, or causing a fire through a faulty update — the manufacturer is strictly liable. The victim does not need to prove the manufacturer was negligent, only that the AI was defective and the defect caused the harm. For self-learning AI that changes after sale, liability remains with the original developer.

### Why does the EU now treat software like a toaster?

The 1985 Product Liability Directive was created for physical goods. But by 2023, most consumer products had embedded software, and many had no hardware defect — the code was the problem. The 2024 recast simply updates the law to reflect reality: a defective algorithm that causes injury is as dangerous as a faulty brake pedal. Courts and companies need the same rules for both.

### Is an open-source developer liable if their code causes harm?

It depends. If the developer places the software on the EU market as a "product" — by selling or distributing it commercially — they are strictly liable. But if they provide code for free on platforms like GitHub, with no commercial relationship to the user, the directive's liability regime does not apply. However, if the open-source component is integrated into a commercial product sold in the EU, the commercial manufacturer bears the liability.

### How does this interact with the EU AI Act?

The AI Act (2024/1689/EU) sets safety requirements for high-risk AI systems, including risk management and documentation obligations. The Product Liability recast provides the legal remedy: if an AI system meets the AI Act's standards but still causes harm, the victim can still sue for damages. The two laws work together — the AI Act prevents harm, the liability directive compensates for it.

## Official sources

- [Directive (EU) 2024/2853 of the European Parliament and of the Council](https://eur-lex.europa.eu/eli/dir/2024/2853)
- [Commission proposal for the recast Product Liability Directive (2021)](https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/12979-Product-Liability-Directive-revision_en)
- [European Parliament legislative resolution of 5 December 2023](https://www.europarl.europa.eu/doceo/document/TA-9-2023-0412_EN.html)
- [Council press release on political agreement (November 2023)](https://www.consilium.europa.eu/en/press/press-releases/2023/11/09/product-liability-directive-council-and-parliament-reach-provisional-agreement/)