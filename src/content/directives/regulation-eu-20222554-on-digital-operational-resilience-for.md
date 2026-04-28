---
title: "Regulation (EU) 2022/2554 on digital operational resilience for the financial sector (DORA)"
directive: "2022/2554/EU"
category: "Financial"
year: 2023
tags: [cybersecurity, financial-services, ict-risk, third-party-risk, operational-resilience]
summary: "DORA forces every bank, insurer, asset manager and crypto provider in the EU — plus their critical IT suppliers — to harden their systems against cyberattacks and IT failures, and gives EU supervisors direct oversight powers over hyperscalers like AWS, Microsoft and Google for the first time."
status: "in-force"
related: ["2016/1148/EU", "2022/2555/EU", "2023/1114/EU"]
llm: "claude-opus-4-7"
---

## What is it?

DORA — the Digital Operational Resilience Act — is a Regulation that imposes a single, uniform cybersecurity and IT-resilience rulebook on roughly 22,000 financial entities across the EU: banks, insurers, investment firms, payment institutions, crypto-asset service providers, trading venues, central counterparties, credit rating agencies and even crowdfunding platforms. It replaces a patchwork of national supervisory expectations and ESA guidelines that had grown organically since the 2008 crisis.

The Regulation rests on five pillars: ICT risk management (with board-level accountability), incident reporting (major incidents must be flagged to regulators within hours), digital operational resilience testing including threat-led penetration testing every three years for significant institutions, third-party ICT risk management with mandatory contractual clauses, and information sharing on cyber threats. Critically, DORA created a brand-new EU oversight regime for "critical ICT third-party providers" — meaning the European Supervisory Authorities (EBA, ESMA, EIOPA) can now directly audit, fine, and order changes at cloud providers like AWS, Microsoft Azure and Google Cloud when their services are deemed systemic to EU finance.

It applies from 17 January 2025, with a fleshed-out body of Regulatory Technical Standards drafted by the ESAs throughout 2023–2024.

## Why was it introduced?

The trigger was not a single incident but a slow-motion realisation inside the European Commission's DG FISMA, then run by Mairead McGuinness, that European finance had become structurally dependent on a handful of American cloud providers — and that no EU regulator had the legal power to walk into their data centres. The 2019 Capital One breach (where a misconfigured AWS S3 bucket exposed 100 million records), the 2020 SolarWinds compromise, and a string of TARGET2 settlement-system outages in late 2020 made the problem politically unavoidable. ECB Vice-President Luis de Guindos warned in November 2020 that cyber risk had become the single biggest operational threat to euro-area banks.

Before DORA, ICT supervision was scattered across the Markets in Financial Instruments Directive (MiFID II), the Payment Services Directive (PSD2), Solvency II, the EBA's 2019 ICT Guidelines, and 27 national interpretations. A French bank using a German cloud subsidiary serving Italian clients faced three different regulators with three different incident-reporting templates. Germany's BaFin and France's ACPR had been pushing since 2018 for a harmonised regime; the Bundesbank's 2018 BAIT supervisory expectations had effectively become a de-facto European standard, and Berlin wanted to lock that in at EU level.

The cloud-concentration question was the most politically charged. A 2020 EBA assessment found that more than 60% of EU banks' critical workloads ran on just three US hyperscalers. France pushed hard — supported by Thierry Breton, a former Atos CEO who knew the cloud market intimately — for direct EU oversight over these providers, over objections from Ireland and the Netherlands who feared antagonising Washington. The compromise was the "Lead Overseer" model: the ESAs can designate a hyperscaler as critical, demand information, conduct on-site inspections, and impose periodic penalty payments of up to 1% of average daily worldwide turnover for non-compliance.

The Commission published the proposal on 24 September 2020 as part of its Digital Finance Package, alongside MiCA (the crypto regulation). Parliament's rapporteur Billy Kelleher (Renew, Ireland) pushed to include crypto-asset providers and to tighten incident-reporting timelines; the final trilogue text was agreed in May 2022.

## Timeline

- **2018** — EBA publishes ICT and security risk management guidelines; Bundesbank issues BAIT expectations
- **2019** — Capital One AWS breach exposes 100 million records, intensifying cloud-concentration debate
- **December 2019** — Commission's Fintech Action Plan flags need for harmonised digital resilience rules
- **September 2020** — Commission proposes DORA as part of the Digital Finance Package
- **November 2020** — ECB's de Guindos identifies cyber risk as top operational threat
- **May 2022** — Political agreement reached in trilogue
- **November 2022** — Parliament adopts DORA (556 votes in favour, 18 against, 21 abstentions)
- **December 2022** — Council adoption; published in OJ as Regulation 2022/2554
- **January 2023** — DORA enters into force with a 24-month implementation runway
- **2023–2024** — ESAs publish Regulatory Technical Standards in two batches
- **17 January 2025** — DORA becomes applicable across the EU
- **2025** — ESAs begin designating critical ICT third-party providers; oversight fees levied

## Impact and consequences

The compliance bill has been substantial. Industry estimates from Deloitte and McKinsey put initial DORA implementation costs for a mid-sized European bank at €5–15 million, and at €50 million-plus for systemically important institutions. The Dutch banking association NVB and the German BVR raised alarms in 2024 that smaller cooperative banks and credit unions were struggling to renegotiate cloud contracts because hyperscalers initially refused to accept DORA's mandatory contractual clauses on audit rights, sub-outsourcing transparency and exit strategies.

By late 2024, AWS, Microsoft and Google had each published "DORA addenda" amending their standard EU contracts — a notable concession, given that all three had historically resisted regulator-mandated audit rights. The European Cloud Industry Alliance lobbied unsuccessfully to soften the third-party rules; CISPE (representing smaller European cloud providers) supported them, seeing competitive advantage.

On the supervisory side, the ESAs set up a Joint Examination Team structure under a Lead Overseer model. The first wave of critical ICT third-party provider designations was expected in mid-2025, almost certainly capturing the three US hyperscalers and likely SAP, Salesforce and one or two SWIFT-adjacent providers. National regulators report a sharp increase in incident notifications: the Banca d'Italia logged a doubling of major-incident reports in Q1 2025 versus Q1 2024, partly reflecting the new lower thresholds.

The Crowdstrike outage of July 2024 — which grounded flights and froze bank branches worldwide — became the unofficial poster-child for why DORA was needed, even though it occurred before the application date.

## Key questions answered

### Why do EU rules on financial cyber security regulate cloud providers directly instead of just the banks that hire them?

Because the systemic risk sits with the providers, not the banks. If AWS eu-west-1 goes down, dozens of EU banks fail simultaneously regardless of how well each one managed its own contract. Brussels concluded that contract-based supervision via the regulated entity was insufficient when a single vendor underpins the whole sector — hence the direct oversight powers, modelled loosely on how central banks oversee critical financial market infrastructures.

### Why are these EU cyber security rules a single law that applies everywhere, rather than letting each country adapt them?

The Commission and ECB explicitly wanted to eliminate national variation. NIS and NIS2 are Directives and produced 27 different transpositions; banks operating cross-border found this unworkable. A Regulation applies directly, leaving member states no room to gold-plate or under-implement. The trade-off is reduced flexibility, which Italian and Spanish smaller banks complained about during consultation.

### Why are crypto companies included in these EU financial cyber security rules?

MiCA, adopted in parallel, brought crypto-asset service providers into the EU regulatory perimeter for the first time. It would have been incoherent to subject them to prudential rules but exempt them from operational resilience requirements — particularly given the FTX collapse in November 2022 (during DORA's final trilogue), which exposed catastrophic IT and governance failures at major crypto exchanges.

### Why do these EU cyber security rules require banks and firms to report cyber attacks so quickly?

The ESAs argued that the existing PSD2 reporting regime — which gave payment institutions up to 24 hours — was too slow to allow supervisors to spot sector-wide patterns. DORA's tiered model (initial notification within hours, intermediate report within 72 hours, final report within one month) was modelled on the ECB's SSM cyber-incident framework piloted with significant banks in 2017–2019.

## Official sources

- [Regulation (EU) 2022/2554 — full text on EUR-Lex](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
- [European Commission: Digital Operational Resilience Act](https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/digital-operational-resilience-act_en)
- [ESAs Joint Committee — DORA Regulatory Technical Standards](https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora)