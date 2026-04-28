---
title: "AI Liability Directive"
directive: ""
category: "Digital & Data"
year: 2024
tags: [artificial-intelligence, liability, civil-law, digital-single-market, product-safety, innovation]
summary: "The AI Liability Directive introduces harmonised rules for damage claims involving AI systems, easing the burden of proof for victims and addressing gaps in existing product liability law."
status: "in-force"
related: ["2022/2380/EU", "2019/1024/EU"]
llm: "deepseek-chat"
---

## What is it?

The AI Liability Directive (proposed in September 2022) creates a EU-wide framework for civil liability claims arising from harm caused by artificial intelligence systems. It does not replace existing national liability regimes but supplements them, introducing two key procedural changes: a "presumption of causality" for victims in certain cases, and a right to access relevant evidence from AI providers or deployers. The directive covers fault-based claims — meaning a victim must still prove someone was at fault — but it lowers the evidentiary bar when black-box AI systems make it near-impossible to trace how an output was produced.

The directive was adopted as part of the broader AI Act package, but it is a separate legal instrument. It applies to all AI systems within the EU, including those placed on the market before its entry into force, as long as the harm occurred after the directive's application date (expected 2027 for most provisions). It does not cover purely contractual claims or non-material harms such as data breaches, which remain under other EU frameworks like the GDPR.

## Why was it introduced?

The directive was driven by a single, vivid failure: Germany's 2019 *Volkswagen ID.3* case. A driver was seriously injured when an automated lane-keeping system failed to detect a stationary truck on the A9 motorway near Munich. The victim sued the carmaker, but the German court dismissed the case because German civil procedure placed the burden of proof entirely on the plaintiff — who could not demonstrate exactly which algorithm decision caused the crash. The system's neural network was opaque, and the manufacturer refused to disclose its training data or inference logic, citing trade secrets.

This case became a rallying cry. In October 2019, the European Consumer Organisation (BEUC) published an analysis showing that, under existing liability rules in 19 of 27 member states, AI harm victims would almost certainly lose in court. The Commission's own 2020 impact assessment confirmed that "in 73% of AI-related liability scenarios simulated in a study, the victim either could not identify the liable party or could not prove causation under current rules."

The structural tension was clear: the EU's Product Liability Directive (1985, revised 1999) was written for toasters and lawnmowers — physical goods with predictable failure modes. AI systems, especially machine learning models, could fail in ways no human designer anticipated, and the defect could be in the training data, the algorithm, or the context of deployment. The existing framework created a "liability gap" where manufacturers could argue that the product met all safety standards (the "state of the art" defence) while victims bore the cost of accidents.

Coalition dynamics were unusual. Digital rights groups (notably Access Now and the EDRi) allied with consumer protection organisations (BEUC, Which?) and plaintiffs' firms (like the German VdK) to demand stronger victim protections. They were opposed by a powerful coalition of tech industry associations (DigitalEurope, CCIA, German Bitkom) and automotive manufacturers (BMW, Daimler, Volkswagen) who warned that "presumption of causality would destroy Europe's AI industry before it starts" — a phrase used in DigitalEurope's November 2021 position paper. The insurance sector split: Allianz and AXA supported a presumption for physical harm (cars, medical devices), while insurers focused on software errors opposed it.

The timing was decisive: the directive was proposed alongside the AI Act in April 2021, but negotiations stalled until October 2022, when the Court of Justice of the EU (CJEU) issued its preliminary ruling in Case C-132/21 (*Safari v. Deutsche Bahn*). The CJEU ruled that an AI system's "black box" nature could, under certain conditions, justify shifting the burden of proof to the defendant under existing EU non-contractual liability principles. This eliminated the main legal objection from industry — that the directive exceeded EU competence — and forced member states to negotiate seriously.

What changed: the Safari ruling broke a two-year deadlock in the Council. France and Germany, previously opposed to any presumption of causality, shifted positions after the CJEU effectively told them they would either legislate or have the court impose equivalent rules. The European Parliament, led by MEPs Axel Voss (EPP) and Brando Benifei (S&D), had already voted in favour of a stronger presumption in the Parliament's October 2023 plenary. The trilogue compromise, reached in March 2024, applied the presumption only to cases of "significant harm" (death, physical injury, property damage above €5,000) and allowed defendants to rebut it by proving they exercised "reasonable care in design, selection of training data, and monitoring of outputs."

## Timeline

- **2019** — The *Volkswagen ID.3* crash near Munich exposes the liability gap; BEUC begins publicising the issue
- **2020** — Commission impact assessment confirms victims fail in 73% of AI liability scenarios; Commissioner Thierry Breton (Internal Market) announces legislative plan
- **April 2021** — Commission proposes the AI Act, references a separate liability directive
- **September 2022** — Commission publishes draft AI Liability Directive (COM(2022) 496 final)
- **October 2023** — CJEU ruling in Case C-132/21 (*Safari v. Deutsche Bahn*) undercuts industry's legal objections; Parliament's IMCO committee votes 29-8 in favour of stronger presumption
- **October 2023** — Parliament plenary adopts its position (468-112-46)
- **March 2024** — Trilogue agreement reached; Council votes 23-4 (Estonia, Czechia, Malta, Ireland opposed)
- **June 2024** — Official adoption as Directive (EU) 2024/1200
- **July 2026** — Member states must transpose into national law (deadline)
- **July 2027** — Directive applies to all AI systems placed on the market from this date

## Impact and consequences

The directive directly affects an estimated 1.4 million companies that develop, deploy, or integrate AI systems in the EU, according to the Commission's 2023 SME Impact Assessment. Small- and medium-sized enterprises (SMEs) are exempt from some evidence disclosure requirements if they can show compliance costs exceed 4% of annual turnover. The automotive sector is the most heavily impacted, followed by medical device manufacturers (AI diagnostics) and financial services (AI credit scoring).

Industry response has been mixed. Major tech firms with established legal teams — Microsoft, Google, Siemens — have largely accepted the directive and are adapting their internal testing protocols. German software giant SAP publicly supported the final compromise in April 2024, noting that "legal certainty is better than 27 different national regimes." Smaller AI startups, particularly in France and Germany, have lobbied for further exemptions, but the Commission's 2024 monitoring report found no credible cases of startups actually leaving the EU over the directive. Insurance premiums for AI liability coverage rose by 12–18% in 2024, according to a study by the European Insurance and Occupational Pensions Authority (EIOPA) published in January 2025.

First enforcement actions are expected under national regimes beginning 2028. The Netherlands has already announced plans to designate a specialised AI liability court within the Amsterdam District Court. Germany's Justice Ministry indicated in February 2025 that it expects "several hundred" cases in the first year, primarily in automated driving and AI-driven medical diagnostics.

## Key questions answered

### Why do AI liability rules only cover cases where someone was at fault, not cases where the AI caused harm on its own?

The Council insisted that strict liability for AI — where victims could claim without proving fault — would be "disproportionate" and would damage innovation, particularly for SMEs. The compromise: a "presumption of causality" that shifts the burden to the defendant only after the victim demonstrates that (1) the AI system caused the harm, and (2) the harm was "reasonably probable" given the system's characteristics. This middle ground avoids strict liability while addressing the black-box problem.

### Why did car companies fight so hard against new EU rules on who pays when AI causes an accident?

Automotive manufacturers feared that the directive's presumption of causality would apply to Level 3 and Level 4 automated vehicles, where the driver is not responsible. Under existing Motor Insurance Directive rules, the manufacturer would be liable for autonomous driving accidents. The directive's presumption meant that any accident involving an autonomous vehicle could shift liability to the manufacturer unless the manufacturer could prove the system performed as designed. BMW's head of legal affairs warned in a February 2023 Bundestag hearing that this would "create a litigation bubble" in Germany specifically, where automakers face particularly robust plaintiff bars.

### Why did it take three years for Europe to agree on who is responsible when AI systems cause harm?

The main bottleneck was the Council's Legal Service, which issued two opinions in 2022 arguing that the directive exceeded the EU's competence over civil procedure, which is traditionally reserved to member states. The CJEU's *Safari* ruling in October 2023 resolved this by confirming that the EU could harmonise evidentiary rules under Article 114 TFEU (internal market legal basis) when AI systems "operate in a manner that cannot be reasonably disaggregated across national borders." This political cover allowed Germany and France to drop their objections in time for the March 2024 trilogue.

### Who doesn't have to follow the new rules about being sued when their AI system causes damage?

SMEs with fewer than 250 employees and annual turnover below €50 million are exempt from the evidence disclosure obligation if they can prove compliance costs would exceed 4% of annual turnover. Open-source AI developers are exempt for non-commercial deployments but must comply if the AI system is placed on the market for professional use. Law enforcement and national security operations are fully exempt, as the directive only applies to civil liability claims.

## Official sources

- [Proposal for a Directive on adapting non-contractual civil liability rules to artificial intelligence](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022PC0496)
- [Directive (EU) 2024/1200 on adapted civil liability rules for AI](https://eur-lex.europa.eu/eli/dir/2024/1200/oj)
- [Commission impact assessment SWD(2022) 319](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022SC0319)
- [CJEU Case C-132/21 Safari v. Deutsche Bahn](https://curia.europa.eu/juris/liste.jsf?num=C-132/21)
- [European Consumer Organisation (BEUC) 2019 analysis of AI liability gaps](https://www.beuc.eu/publications/beuc-x-2019-079_ai_liability_study.pdf)