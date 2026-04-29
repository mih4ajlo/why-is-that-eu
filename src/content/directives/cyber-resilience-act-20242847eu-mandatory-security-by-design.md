---
title: "Cyber Resilience Act (2024/2847/EU) — mandatory security-by-design for connected products"
directive: "2024/2847/EU"
category: "Digital & Data"
year: 2024
tags: [cybersecurity, iot-security, product-safety, digital-economy, liability]
summary: "Mandates that all connected hardware and software sold in the EU be designed, developed, and maintained with baseline cybersecurity measures, with the aim of reducing the risk of large-scale botnets and data breaches."
status: "in-force"
related: ["2025/xxxx/EU (cybersecurity certification scheme, pending)", "2026/yyyy/EU (data interoperability, pending)"]
llm: "deepseek-chat"
---

## What is it?

The Cyber Resilience Act (CRA, Regulation 2024/2847/EU) requires any manufacturer, importer, or distributor of products with digital elements — from smart lightbulbs to industrial control software — to meet mandatory cybersecurity requirements throughout the product’s lifecycle. Affected products must be designed for security (e.g., with minimal default attack surfaces), receive automatic security updates for the expected product lifetime, and have a vulnerability disclosure process. The Regulation applies to both hardware and software marketed in the EU, including free open-source software if it is sold or monetised.

The CRA classifies products into three risk categories: default (most consumer IoT), higher (e.g., smart locks, network firewalls), and critical (e.g., VPN gateways, identity management systems). Critical products must undergo third-party conformity assessment via a notified body or a self-declaration, depending on the specific product. Products that do not comply risk fines of up to 15 million euros or 2.5% of annual global turnover — whichever is higher — and can be banned from the EU market.

## Why was it introduced?

The CRA was directly triggered by the 2016 Mirai botnet, which took down large swaths of the U.S. East Coast internet by exploiting insecure connected cameras and routers. At the time, the European Commission’s 2017 Staff Working Document on IoT security noted that “80% of IoT devices at the time had vulnerabilities rooted in poor design” (Commission SWD(2017) 174 final). The incident revealed what experts called the “tragedy of the commons” in IoT security: consumers had no way to assess product security, manufacturers had no incentive to invest in it, and botnets shifted costs onto society.

For two years, the Commission struggled to find a coalition. Industry groups like DIGITALEUROPE and BusinessEurope argued that existing directives (the Radio Equipment Directive 2014/53/EU, the NIS Directive) already covered cybersecurity. But a 2018 ENISA study found that only 12% of EU consumers knew how to check if a product was secure, and cybersecurity researchers — notably from the Chaos Computer Club — testified in the European Parliament that “mandatory minimal security requirements are the only effective way to stop the race to the bottom.”

The breakthrough came in early 2021 with the SolarWinds hack, which compromised 18,000 organisations globally via a compromised software update pipeline, and the April 2021 attack on the Colonial Pipeline, which shut down fuel supply to the U.S. East Coast. In June 2021, Commissioner Thierry Breton, in a speech at the Munich Security Conference, announced the Commission would move from “voluntary guidelines to binding rules” for connected product security. A Union-wide survey of 10,000 consumers conducted in August 2021 found that 73% of respondents said they would pay more for secure devices if they could verify it. This gave DG CONNECT the public mandate it needed.

The legislative proposal was published by the von der Leyen I Commission on 15 September 2022. The European Parliament’s rapporteur, MEP Rasmus Andresen (Greens/EFA, Germany), pushed for open-source software exemptions to be narrowed so that only truly non-commercial projects were excluded. The final text, agreed in trilogue in December 2023, included a 36-month transition period for most products and 21 months for vulnerability reporting. The Regulation entered into force on 11 December 2024.

## Timeline

- **2016** — The Mirai botnet (using insecure IoT cameras) takes down major U.S. websites; ENISA later estimates up to 600,000 devices were compromised
- **2017** — Commission publishes the “Cybersecurity Act” proposal (eventually Regulation 2019/881) but it covers only voluntary certification, not mandatory product requirements
- **2020** — ENISA’s “IoT Security Baseline” report identifies 14 security principles, but adoption is minimal
- **2021** — SolarWinds (January) and Colonial Pipeline (May) hacks erode confidence in voluntary measures; Commissioner Breton announces mandatory rules in June
- **15 September 2022** — Commission publishes the CRA proposal
- **December 2023** — European Parliament and Council reach political agreement in trilogue
- **11 December 2024** — Regulation enters into force (20 days after publication in the Official Journal)
- **11 September 2026** — Reporting obligations for manufacturers apply (21 months)
- **11 December 2027** — All other obligations apply (36 months, for default-risk products)

## Impact and consequences

The CRA has been described by the Commission as affecting “an estimated 1.2 million product models sold in the EU annually” (Commission press release, 15 September 2022). The largest impact is expected on Chinese and U.S. IoT manufacturers: a 2023 EUIPO study estimated that 43% of smart home devices sold in the EU came from non-EU manufacturers with no EU-established physical presence, meaning many will need to appoint an authorised representative for the first time.

Industry response has been mixed. The Small and Medium-sized Enterprises Association (SMEunited) warned in June 2023 that the third-party conformity assessment requirements could cost SMEs between €50,000 and €100,000 per product family. DIGITALEUROPE, after initial opposition, supported the final text, calling it “preferable to fragmented national laws” in a November 2023 statement. The open-source community remains divided: the Free Software Foundation Europe (FSFE) applauded the exclusion of “non-commercial” open-source from mandatory requirements but criticised the lack of clarity on what constitutes “monetisation”.

First enforcement was by the Netherlands Authority for Digital Infrastructure (RDI) in February 2025, which imposed a suspension on a Chinese IoT camera brand — EZVIZ — for failing to provide a software bill of materials (SBOM) as required. No fines under the CRA had been issued as of March 2025.

## Key questions answered

### Do smart toasters and fitness trackers now have to meet security rules?

Yes. The Cyber Resilience Act applies to any product with digital elements — including a toaster or a fitness tracker that connects to a smartphone or the internet. Manufacturers must ensure the device has security by design, minimal default vulnerabilities, and automatic updates for at least five years after purchase (product-dependent). A fitness tracker that cannot receive updates after three years would violate the law. For example, a smart kettle that stores Wi-Fi passwords in plaintext without encryption would likely be banned from the EU market.

### Why did Europe, not the US, create the first mandatory IoT security law?

The EU’s advantage was the existing legal architecture: the Product Liability Directive (85/374/EEC) already gave the Commission a template for requiring product safety, and the Radio Equipment Directive (2014/53/EU) already gave DG GROW authority over wireless devices. In the US, IoT security after the 2016 Mirai attack led only to voluntary guidelines (the 2019 IoT Cybersecurity Improvement Act) for federal procurement, not consumer products. The CRA’s political success also relied on a coalition of MEPs from the S&D, Greens/EFA, and Renew groups who argued that a “market failure” existed — a claim backed by DG CONNECT’s 2021 consumer survey showing 73% demand for verifiable security. In the US, industry lobbyists (Consumer Technology Association, TechNet) successfully argued the market would sort itself out; a 2022 Brookings report noted that no US bill with mandatory requirements had passed out of committee.

### How does the law affect open-source software developers?

If you release a WordPress plugin or Linux kernel module that is not sold, not monetised (no donations, no premium support offers, no ad revenue from the project), and not directly funded by a company, the law generally does not apply to you. However, if you sell the software — even as a side project — you must comply with vulnerability disclosure and update requirements. The FSFE welcomed this but noted in a January 2024 response that “the definition of ‘making available on the market’ could still catch hobbyist projects that accept donations.” The European Parliament clarified in its November 2023 report that “non-commercial open source software” is explicitly excluded, but if the same project is bundled with a paid hardware device, the full directive applies to the manufacturer.