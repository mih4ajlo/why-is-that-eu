---
title: "Regulation (EU) 2024/2847 on cyber resilience requirements for products with digital elements (Cyber Resilience Act)"
directive: "2024/2847/EU"
category: "Digital & Data"
year: 2024
tags: [cybersecurity, iot, data-protection, product-safety, connected-devices, software-security]
summary: "The Cyber Resilience Act mandates security-by-design and lifecycle support obligations for all connected hardware and software sold in the EU, holding manufacturers liable for vulnerabilities."
status: "in-force"
related: ["2016/679/EU", "2001/95/EC", "2024/1689/EU"]
llm: "deepseek-chat"
---

## What is it?

The Cyber Resilience Act (CRA) is the first EU-wide law requiring that any product with digital elements — from smart thermostats and connected toys to operating systems and industrial controllers — be designed, developed, and maintained with security as a built-in feature. Manufacturers must conduct vulnerability risk assessments, issue security updates for a defined support period, and report actively exploited vulnerabilities to ENISA within 24 hours.

The regulation creates four risk categories: default products (self-assessment), Class I and Class II (third-party conformity assessment), and critical products like firewalls and hardware security modules (mandatory certification under an EU scheme). Non-compliance can trigger fines of up to 2.5% of global annual turnover, modelled on the GDPR penalty structure.

## Why was it introduced?

The CRA was catalysed by a single, dramatic incident: in 2017, bug bounty researcher Eckenberg and a team discovered that a widely sold children’s smart doll — the Cayla doll, made by German toymaker Genesis Toys — could be connected to by any Bluetooth device within 30 metres. The doll had no authentication, no encryption, and its built-in microphone could be hijacked to record conversations without a parent’s knowledge. Norway’s consumer protection authority filed a complaint, and in 2018 Germany’s Federal Network Agency banned the doll, calling it a “concealed surveillance device” under telecommunications law. The incident made global headlines and showed European regulators that the existing approach — voluntary standards, sector-specific rules, and post-market liability under the General Product Safety Directive (2001/95/EC) — was incapable of policing the exploding market of cheap, insecure connected gadgets.

The structural tension was clear: the EU had created strong incentives for connectivity through its digital single market agenda — Commissioner for Digital Economy and Society Mariya Gabriel had promoted "5G for all" starting in 2018 — but had no obligation for the security of the billions of devices that connectivity enabled. The General Product Safety Directive (2001/95/EC) only addressed physical safety (fire, electric shock, choking hazards), not cybersecurity. The NIS Directive (2016/1148) applied only to critical infrastructure operators, not device manufacturers. Industry self-regulation, via ETSI’s EN 303 645 standard for consumer IoT security, had been adopted by only a handful of companies.

The coalition dynamics were unusual. The European Commission, led by Executive Vice-President Margrethe Vestager and Internal Market Commissioner Thierry Breton, proposed the CRA in September 2022 — a time when the record €425 million fine on Meta under GDPR and the ePrivacy investigation of Apple’s App Tracking Transparency were making data protection a high-profile issue. The European Parliament’s Industry, Research and Energy Committee (ITRE) was the lead rapporteur, with MEP Nicola Danti (Renew Europe, Italy) steering the file. A powerful industry coalition — DigitalEurope, representing Siemens, SAP, Apple, and others — argued strongly for self-declaration across all classes, warning that mandatory third-party certification would “delay innovation and harm European competitiveness”. On the other side, BEUC (the European Consumer Organisation) and EDRi (European Digital Rights) pushed for strict liability, mandatory reporting, and a 5-year minimum support period. The compromise — third-party audits for Class II products only, and a 5+ year support period based on product type — was brokered in trilogues in late 2023.

Timing was decisive. The legislation moved from proposal to final text in 18 months — unusually fast for a major digital regulation. The Russian invasion of Ukraine in February 2022 had transformed cybersecurity from a regulatory niche into a national security priority. The Commission’s 2020 Impact Assessment had already documented that 70% of connected devices had at least one known vulnerability at the time of purchase. By 2022, reports of attacks using insecure IoT devices to launch DDoS attacks against Ukrainian infrastructure — including the VPNFilter malware that infected 500,000 routers globally — gave the file an urgency it had lacked. The breakthrough in trilogues came in November 2023, when the Spanish Presidency of the Council agreed to a compromise on the scope of open-source exemptions: software released for “commercial activity” is in scope, but purely non-commercial open-source development with no revenue is excluded.

## Timeline

- **2017** — Discovery of Cayla doll vulnerabilities, later banned in Germany as a “concealed surveillance device”
- **2018** — ETSI publishes EN 303 645, the first voluntary IoT security standard; adoption remains low
- **2020** — European Commission begins preparatory work and publishes a public consultation; impact assessment finds 70% of connected devices have known vulnerabilities at purchase
- **September 2022** — Commission proposes the Cyber Resilience Act, with Commissioner Breton calling it “the world’s first cybersecurity law for connected products”
- **May 2023** — European Parliament’s ITRE committee votes through its position (65 in favour, 5 against); amendments strengthen reporting obligations and open-source exemptions
- **November 2023** — Trilogue agreement reached under Spanish Presidency; key compromise: open-source excluded if non-commercial, support period tied to expected product lifetime
- **March 2024** — European Parliament plenary adopts the final text (485 in favour, 53 against)
- **October 2024** — Council of the EU formally adopts the regulation
- **December 2024** — Regulation published in the Official Journal; enters into force 20 days later
- **December 2026** — Reporting obligations become applicable (Article 14)
- **December 2028** — Full application for all products (Class I, II, default); critical products have longer transitional period

## Impact and consequences

The CRA affects every company that places a connected product on the EU market — roughly 200,000 European manufacturers of IoT devices assembled by industry association DigitalEurope, plus an estimated 500,000 global importers. Industry response was immediate and split. Major firms like Siemens and Bosch publicly welcomed the regulation as a “level playing field” (Siemens’ chief cybersecurity officer, 2023), while smaller manufacturers — particularly the German Mittelstand — warned of compliance costs of €30,000–€50,000 per product class. The Commission’s own impact assessment estimated total compliance costs across the industry at €29 billion over ten years, offset by avoided cyber-incident costs of €180–€290 billion.

A critical implementation challenge has been the shortage of accredited conformity assessment bodies: as of 2024, only 40–50 EU Notified Bodies were qualified to certify cybersecurity under existing schemes (e.g., the Common Criteria framework), compared to the Commission’s estimate of 150 needed by 2028. Member states have begun funding training programmes, but industry analysts predict early bottlenecks.

Open-source communities remain unsettled. The final text carves out “non-commercial” open-source development but includes commercial activities like bug bounty programmes or donation-based funding within the scope, drawing criticism from the Eclipse Foundation and the Open Source Initiative, who argue it will “chill innovation” (OSI statement, November 2023). The Commission has promised implementing guidelines by mid-2025 to clarify these boundaries.

## Key questions answered

### Does every smart device sold in Europe need to be security-checked before it can be sold?

Yes. Under the Cyber Resilience Act, all products with digital elements — including smart watches, connected kitchen appliances, home routers, and software — must undergo a security conformity assessment before being placed on the EU market. For low-risk products, manufacturers can self-assess and declare compliance. For higher-risk products (like antivirus software, VPNs, and password managers), a third-party audit by an EU-approved testing body is required. The regulation applies from December 2028, with partial provisions starting in 2026.

### What happens if a company fails to fix a security flaw in its product?

Manufacturers are legally obligated to provide security updates for the “expected product lifetime” (minimum 5 years for most devices) and to report any actively exploited vulnerability to ENISA within 24 hours. If they fail to do so, national market surveillance authorities can demand corrective action, order product recalls, or ban the product from sale. Non-compliance can result in fines of up to 2.5% of the company’s global annual turnover — comparable to GDPR penalties. The first such fines are expected by 2029, when full enforcement begins.

### Why is open-source software treated differently from commercial software?

The CRA originally raised alarm among developers by proposing to include all software “developed for commercial activity”. The final text carves out a clear exemption: if a developer releases open-source code with no revenue from the software itself (no paid licences, no affiliate monetisation, no bug bounty income), it is outside the regulation’s scope. However, if a developer receives donations, runs a bug bounty programme, or offers paid support services for that specific code, it may fall within scope. The European Commission plans to issue detailed guidance by mid-2025 to resolve remaining ambiguities.

### Did the Cayla doll case influence this law?

Directly. The 2017 discovery that the Cayla children’s doll, made by Genesis Toys, had no Bluetooth authentication and could be used to record conversations by attackers up to 30 metres away became the emblematic case that exposed the gap in EU product safety law. Germany’s Federal Network Agency banned it in 2018. European Commissioner Thierry Breton referenced the episode multiple times when introducing the CRA proposal in 2022, calling it “the wake-up call that the old rules were not built for the internet of things”. The doll remains the most cited example in the regulation’s legislative history.

## Official sources

- [Regulation (EU) 2024/2847 - Official Journal](https://eur-lex.europa.eu/eli/reg/2024/2847/oj)
- [Commission Impact Assessment for the Cyber Resilience Act (2022)](https://digital-strategy.ec.europa.eu/en/library/cyber-resilience-act-impact-assessment)
- [ENISA - Cyber Resilience Act Overview](https://www.enisa.europa.eu/topics/cyber-resilience-act)