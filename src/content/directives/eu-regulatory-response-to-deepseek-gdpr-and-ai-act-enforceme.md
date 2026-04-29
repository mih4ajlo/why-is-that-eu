---
title: "EU Regulatory Response to DeepSeek (GDPR and AI Act Enforcement Actions)"
category: "Digital & Data"
year: 2025
tags: [artificial-intelligence, data-protection, gdpr, ai-act, china, cross-border-data]
summary: "When Chinese AI lab DeepSeek released its R1 model in January 2025, European regulators moved within days to restrict it — Italy's data protection authority ordered the app blocked, and Ireland, Belgium, France and the Netherlands opened parallel inquiries citing GDPR and AI Act concerns. The episode became the first major test of how EU rules apply to a foreign frontier-AI model."
status: "in-force"
related: ["2016/679/EU", "2024/1689/EU"]
llm: "claude-opus-4-7"
---

## What is it?

DeepSeek is not EU legislation — it is a Hangzhou-based AI lab whose January 2025 release of the R1 reasoning model triggered the first co-ordinated European regulatory response to a Chinese frontier-AI system. The legal instruments deployed against it were existing ones: the General Data Protection Regulation (Regulation 2016/679) and, in the background, the AI Act (Regulation 2024/1689), which had entered into force in August 2024 with its first prohibitions applying from February 2025.

The Italian Garante per la protezione dei dati personali led the response. On 30 January 2025 it issued an urgent order requiring DeepSeek to suspend processing of Italian users' personal data, citing inadequate answers to a formal questionnaire about what data the company collected, on what legal basis, where it was stored, and whether Italian users had been informed in line with Articles 13 and 14 GDPR. Apple and Google removed the DeepSeek app from their Italian stores within hours.

In parallel, Ireland's Data Protection Commission — DeepSeek's likely lead supervisory authority for any EU establishment — wrote to the company seeking information; Belgium's APD, France's CNIL and the Dutch AP confirmed they were assessing the service. The European Data Protection Board co-ordinated information exchange between the national authorities.

## Why was it introduced?

The trigger was speed and scale. DeepSeek's R1 model, released as open weights on 20 January 2025, achieved benchmark results comparable to OpenAI's o1 at a fraction of the reported training cost, and the consumer chatbot built on it briefly topped the Apple App Store in the United States and several EU member states. Within ten days, millions of Europeans had downloaded an app whose privacy policy stated that personal data — including chat inputs, device identifiers and keystroke patterns — were stored on servers in the People's Republic of China.

That last point collided with two settled lines of EU law. First, the Court of Justice's *Schrems II* ruling (Case C-311/18, July 2020) had already established that transfers of personal data to jurisdictions without "essentially equivalent" protection require additional safeguards; China has no adequacy decision from the Commission. Second, the Garante had spent two years building enforcement muscle on generative AI: it temporarily blocked ChatGPT in March 2023, fined OpenAI €15 million in December 2024, and opened proceedings against Replika and others. DeepSeek arrived into a regulatory environment that already had a template.

The political backdrop sharpened the response. The Commission under Ursula von der Leyen's second term had made "technological sovereignty" a defining theme; Executive Vice-President Henna Virkkunen, who took the digital portfolio in December 2024, repeatedly described foreign AI models as a national-security as well as a data-protection question. The AI Act's prohibitions on certain manipulative and social-scoring systems were due to apply from 2 February 2025 — three days after the Garante's order — concentrating minds on whether DeepSeek's training data and content-moderation practices (including reported refusals to discuss Tiananmen Square or Taiwan) might fall foul of fundamental-rights provisions.

Industry dynamics mattered too. European AI firms — including France's Mistral and Germany's Aleph Alpha — had spent 2023–24 arguing that the AI Act would burden them while leaving non-EU competitors untouched. The DeepSeek episode allowed regulators to demonstrate that the framework reached foreign providers offering services in the Union, regardless of where they were established, under the AI Act's market-placement test and GDPR's Article 3(2) targeting criterion.

## Timeline

- **2023, March** — Italy's Garante temporarily blocks ChatGPT, establishing the template later used against DeepSeek.
- **2024, August** — AI Act enters into force; risk-based obligations phased in over 6–36 months.
- **2024, December** — Garante fines OpenAI €15 million for GDPR breaches related to ChatGPT training.
- **2025, 20 January** — DeepSeek releases R1 model weights publicly; consumer app climbs app-store charts globally.
- **2025, 28 January** — Garante sends formal questionnaire to DeepSeek under Article 58 GDPR.
- **2025, 30 January** — Garante issues urgent measure ordering suspension of processing of Italian users' personal data; DeepSeek app removed from Italian app stores.
- **2025, early February** — Ireland's DPC, France's CNIL, Belgium's APD and the Netherlands' AP confirm parallel inquiries; EDPB co-ordinates.
- **2025, 2 February** — First AI Act prohibitions become applicable across the Union.

## Impact and consequences

The immediate effect was geographic fragmentation: DeepSeek's consumer app remained available in some member states while blocked in Italy, illustrating how GDPR's "one-stop-shop" mechanism breaks down when a non-EU controller has no establishment in the Union and any supervisory authority can act on its own territory. Several US states (notably Texas and New York for state devices) and the Australian and Taiwanese governments imposed their own restrictions on government use within weeks, citing national-security rather than privacy grounds.

For European AI policy, the case produced two durable consequences. It demonstrated that GDPR remained the fastest enforcement tool against foreign AI models, given that most AI Act obligations on general-purpose models do not bite until August 2025 and on high-risk systems until 2026 or 2027. And it intensified the debate — already live in the Council and Parliament — about whether the Commission should publish guidance on how the AI Act applies to open-weight models distributed from third countries, a question on which the AI Office began consulting in 2025.

Companies offering AI services into the EU drew a practical lesson: a privacy notice, an EU representative under Article 27 GDPR, and a documented legal basis for training-data scraping are now minimum entry conditions, not optional polish.

## Key questions answered

### Can the EU block a Chinese AI app?

Yes — and Italy did so within ten days of DeepSeek's launch. National data protection authorities can issue urgent suspension orders under Article 66 GDPR when they judge user data is at risk, and the AI Act adds further grounds for restricting AI systems placed on the EU market, regardless of where the provider is based.

### Why did Italy act first instead of Brussels?

GDPR enforcement is decentralised: each member state's data protection authority can act on its own territory, and Italy's Garante has built a reputation as the most aggressive on generative AI, having previously blocked ChatGPT and Replika. The Commission itself does not enforce GDPR against private companies; it sets policy and may open infringement proceedings against member states.

### Does using a Chinese AI model break EU privacy law automatically?

Not automatically, but it raises the bar significantly. After the Court of Justice's *Schrems II* ruling, transfers of personal data to China — which has no EU adequacy decision — require additional safeguards such as standard contractual clauses plus technical measures, and the controller must assess whether Chinese surveillance law undermines those protections in practice.

### What happens when AI rules and privacy rules overlap?

They stack rather than replace each other. A provider like DeepSeek must comply with GDPR for any personal data processing and, separately, with the AI Act's obligations on general-purpose AI models once those provisions apply. Regulators have signalled they will use whichever instrument bites first — which in early 2025 meant GDPR.

## Official sources

- [Garante per la protezione dei dati personali — provvedimento DeepSeek (30 January 2025)](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10097450)
- [European Data Protection Board — statements on AI and cross-border enforcement](https://www.edpb.europa.eu/)
- [Regulation (EU) 2016/679 — General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [Regulation (EU) 2024/1689 — Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)