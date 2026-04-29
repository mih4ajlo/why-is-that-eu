---
title: "Regulation (EU) 2024/2847 on horizontal cybersecurity requirements for products with digital elements"
directive: "2024/2847/EU"
category: "Digital & Data"
year: 2024
tags: [cybersecurity, iot-security, product-safety, supply-chain, software-security, digital-economy]
summary: "The Cyber Resilience Act (CRA) mandates security-by-design for connected hardware and software shipped in the EU, requiring manufacturers to assess vulnerabilities, provide security updates for five years, and report exploited flaws — or face fines of up to 2.5% of global annual turnover."
status: "in-force"
related: ["2016/679/EU"]
llm: "deepseek-chat"
---

## What is it?

The Cyber Resilience Act (CRA) is an EU regulation that requires manufacturers and retailers of any "product with digital elements" — from smart lightbulbs and connected thermostats to operating systems and antivirus software — to build cybersecurity into their design and support it throughout the product's expected lifetime. It entered into force on 10 December 2024, with most provisions applying from 11 December 2027.

Under the CRA, products must ship with a secure default configuration, receive vulnerability patches for a period the manufacturer must specify (at least five years for most products), and come with a software bill of materials that lets customers and regulators know what open-source components are inside. Manufacturers must report actively exploited vulnerabilities and security incidents to the EU Agency for Cybersecurity (ENISA) within 24 hours. Failure to comply can trigger fines of up to 15 million euros or 2.5% of the company's global annual turnover — whichever is higher.

The regulation classifies products into four tiers based on risk: default (self-declared), Class I (critical), Class II (more critical), and a special category for components like firewalls and intrusion detection systems that must undergo third-party certification. Products that meet the EU's European cybersecurity certification scheme (EUCC) or equivalent under the Cybersecurity Act (2019/881/EU) are presumed to comply.

## Why was it introduced?

The CRA was born from a string of high-profile cyberattacks that exposed how poorly secured consumer IoT devices had become, and the failure of the existing voluntary cybersecurity certification system to drive any meaningful change.

The immediate trigger was the 2021 attack on Kaseya, a US-based IT management software company, where ransomware hit 1,500 downstream organisations through a single vulnerability in Kaseya's VSA platform. The attack forced the Swedish grocery chain Coop to close 800 stores for over a week. In a 2022 press conference, EU Internal Market Commissioner Thierry Breton pointed directly at this incident: "A single product with digital elements is hacked — and it can endanger an entire supply chain."

Structural tension had been building for years. The EU's only cybersecurity certification framework — the EUCC, finalised under the 2019 Cybersecurity Act — was purely voluntary, and industry uptake was negligible. By 2022, ENISA had certified exactly zero consumer IoT products under any EU-level scheme. The Commission's 2021 impact assessment found that the annual cost of cyberattacks on connected products in the EU had reached €290 billion, with over 70% of IoT devices vulnerable to attack, according to a 2020 ENISA study.

Industry resistance was fierce. DigitalEurope, the trade association representing Apple, Siemens, and Bosch, lobbied heavily against mandatory vulnerability reporting, arguing it would expose trade secrets and create "liability nightmares." A 2022 leaked DigitalEurope position paper warned the proposal would "cripple European software SMEs" and drive investment out of the EU. The German automotive association VDA also opposed classification requirements, insisting that connected cars should be exempt — a carve-out that was ultimately rejected in favour of a single horizontal framework.

The coalition that pushed the CRA through was an unusual alliance of consumer protection advocates, cybersecurity researchers, and large European industrial manufacturers who had already invested in security. BEUC, the European Consumer Organisation, campaigned aggressively after a 2021 test of 15 smart home devices — including child-monitoring cameras from TP-Link and baby monitors from VTech — found that every single one contained at least one critical vulnerability. The European Parliament's rapporteur, Nicola Danti (Renew Europe, Italy), told a February 2023 hearing that "voluntary measures have failed. Consumers cannot be expected to patch their own refrigerators."

Timing was decisive. The CRA was proposed in September 2022, six months after Russia's full-scale invasion of Ukraine, which triggered a 237% increase in cyberattacks against EU targets, according to ENISA's 2022 Threat Landscape Report. The fact that Kaspersky — a Russian cybersecurity firm under EU sanctions suspicion — had been used by European governments and critical infrastructure operators for over a decade gave urgency to the question of where software supply chains could be compromised.

The final compromise was struck under the Spanish Presidency of the Council in November 2023. The most contentious issue was open-source software: a late campaign by the Eclipse Foundation and the Apache Software Foundation, supported by EU Commissioner for Digital Economy Margrethe Vestager, argued that the original draft would have made individual open-source developers liable for vulnerabilities in their code, effectively killing community-driven projects. The final text exempted non-commercial open-source development but required foundations and commercial distributors to comply if they place products on the market.

## Timeline

- **2020** — ENISA publishes a study finding 70% of IoT devices on the EU market have critical security vulnerabilities
- **September 2021** — Kaseya ransomware attack disrupts 1,500 downstream organisations globally, including Coop Sweden
- **December 2021** — BEUC tests 15 smart home devices; all have at least one critical flaw
- **March 2022** — EU Parliament passes resolution calling for mandatory cybersecurity requirements for connected products
- **May 2022** — Commission publishes Inception Impact Assessment for the CRA
- **September 2022** — Commission proposes the CRA as part of the 2022 State of the Union speech by President Ursula von der Leyen
- **November 2023** — Spanish Presidency of the Council reaches provisional deal with Parliament
- **March 2024** — Parliament adopts the final text by a landslide 517-12 vote
- **10 December 2024** — Regulation enters into force
- **11 December 2025** — Manufacturers must report actively exploited vulnerabilities (reporting obligations apply early)
- **11 December 2027** — All product requirements apply, including conformity assessment and CE marking
- **11 December 2028** — Transition period ends; all non-compliant products must be withdrawn from the EU market

## Impact and consequences

The CRA will require every company placing any connected product on the EU market — estimated at over 4 billion devices annually, according to a 2023 Commission briefing — to undergo a fundamental redesign of their development processes. For Chinese electronics manufacturers producing smart plugs, cameras, and wearables for the EU market — which accounted for over 60% of IoT imports in 2022, per Eurostat — the compliance burden is significant because they must now assign a qualified "authorised representative" in the EU who can be held liable for security flaws.

The regulation has already reshaped the open-source ecosystem. The Eclipse Foundation, representing over 350 organisations, launched a compliance programme in early 2024. Linux Foundation Europe created a legal working group to define how foundations should handle vulnerability disclosures under the 24-hour reporting window. In a December 2024 blog post, the Free Software Foundation Europe called the CRA "the most consequential EU regulation for open source since the GDPR," noting that while non-commercial developers are exempt, the definition of "placing on the market" remains legally uncertain for pre-release code.

The first major enforcement test will likely involve consumer IoT routers. In 2023, the German cybersecurity agency BSI, in cooperation with ENISA, found that over 40% of consumer routers sold in Germany had not received a single firmware update since sale. Under the CRA, those manufacturers will be required to issue security patches for at least five years — a rule that may force companies like D-Link and TP-Link to extend product support dramatically or exit the EU market entirely.

## Key questions answered

### Do I have to worry about security updates for my smart fridge, thermostat, or baby monitor in the EU?

Yes. Under the CRA, the manufacturer must clearly state at the point of sale how long the product will receive security updates — at least five years for most devices. If a company stops supporting its products illegally, the EU can order it to notify owners and may issue a recall. This ends the practice of selling "smart" devices that become vulnerable within months of leaving the factory.

### When do EU cybersecurity rules for connected devices actually start being enforced?

The regulation entered into force in December 2024, but most requirements apply from 11 December 2027. Manufacturers get a three-year transition to redesign their products and obtain certification. The reporting rule for actively exploited vulnerabilities starts a bit earlier — from 11 December 2025 — meaning companies must be ready to notify ENISA within 24 hours of discovering a security flaw being used in an attack within about a year from now.

### Are open-source apps and DIY projects covered by these EU cyber rules?

No, if you develop open-source code as a non-commercial hobby or academic project, you are exempt. But if you are a company or a foundation that packages and distributes that code on the EU market — say as a Linux distribution or a cloud service — you must comply. The key test is whether the software is "placed on the market" in exchange for payment or as part of a commercial service.

## Official sources

- [Regulation (EU) 2024/2847 - Official Journal of the EU](https://eur-lex.europa.eu/eli/reg/2024/2847/oj)
- [Cyber Resilience Act - European Commission](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)
- [ENISA - Ad-hoc Cybersecurity Certification](https://www.enisa.europa.eu/topics/standards-and-certification)