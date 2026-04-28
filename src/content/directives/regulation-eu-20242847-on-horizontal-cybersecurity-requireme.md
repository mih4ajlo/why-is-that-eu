---
title: "Regulation (EU) 2024/2847 on horizontal cybersecurity requirements for products with digital elements"
directive: "2024/2847/EU"
category: "Digital & Data"
year: 2024
tags: [cybersecurity, product-safety, iot, software, ce-marking, vulnerability-disclosure]
summary: "The Cyber Resilience Act imposes mandatory cybersecurity requirements on virtually every product with digital elements sold in the EU — from smart fridges to industrial firewalls — backed by fines of up to €15 million or 2.5% of global turnover. Manufacturers must provide security updates, disclose actively exploited vulnerabilities to ENISA within 24 hours, and affix CE marks attesting to cyber-compliance."
status: "in-force"
related: ["2022/2555/EU", "2019/881/EU", "2016/679/EU"]
llm: "claude-opus-4-7"
---

## What is it?

The Cyber Resilience Act (CRA) is the EU's first horizontal cybersecurity law covering hardware and software products placed on the single market. It sets essential requirements — secure-by-design development, no known exploitable vulnerabilities at launch, free security updates for an expected product lifetime of at least five years where appropriate, and conformity assessment via the familiar CE marking route.

The regulation applies to almost any "product with digital elements" — connected toys, smart meters, baby monitors, password managers, operating systems, microcontrollers, routers — with stricter conformity assessment for "important" and "critical" classes such as identity management systems, hypervisors, industrial firewalls and smart cards. Open-source software developed in a non-commercial context is largely exempt, after a fierce lobbying battle that reshaped the original 2022 draft.

Manufacturers must run vulnerability handling processes, publish a Software Bill of Materials (SBOM) on request to authorities, and notify ENISA and the relevant national CSIRT of actively exploited vulnerabilities within 24 hours of awareness. National market surveillance authorities can order recalls or withdraw products; fines reach €15 million or 2.5% of worldwide annual turnover, whichever is higher.

## Why was it introduced?

In April 2021, the SolarWinds Orion supply-chain compromise — which gave Russian SVR hackers access to 18,000 customers including the European Banking Authority and several EU member states — convinced Commissioner Thierry Breton that voluntary cybersecurity self-regulation had failed. Months later, the Log4Shell vulnerability disclosed in December 2021 exposed the fact that a flaw in a single Java logging library maintained by three unpaid volunteers could compromise hundreds of millions of devices, including those used by EU institutions. ENISA's 2021 Threat Landscape report documented a 150% increase in ransomware incidents and put the global cost of cybercrime at €5.5 trillion.

Ursula von der Leyen announced the initiative in her September 2021 State of the Union address, framing it as the digital counterpart to existing CE-marked product safety. Until then, EU cybersecurity rules had been sectoral and patchy: the NIS Directive covered operators of essential services; the Cybersecurity Act of 2019 created a voluntary certification scheme run by ENISA; the Radio Equipment Directive's delegated act of October 2021 covered only wireless devices. A connected dishwasher faced no security requirements at all. The Commission's impact assessment estimated that 90% of products on the market had security flaws and that the cost of cyber incidents to EU businesses ran to €180–290 billion annually.

The Commission proposal landed on 15 September 2022. The most bruising fight came from open-source maintainers. The Eclipse Foundation, the Python Software Foundation, the Linux Foundation Europe and the Open Source Initiative published an open letter in April 2023 warning that holding individual maintainers liable would "have a chilling effect on open source software development". Bert Hubert, the Dutch developer behind PowerDNS, called it "an extinction-level event" for European open source. After negotiations led by rapporteur Nicola Danti (Renew), the trilogue agreement of 30 November 2023 carved out non-commercial open-source projects and created a softer regime for "open-source software stewards". Industry associations including DigitalEurope and BSA pushed back on the 24-hour disclosure window, arguing it forced reporting before patches existed; the final text required notification of the vulnerability but not of technical details that could aid attackers.

## Timeline

- **December 2020** — SolarWinds breach disclosed, affecting EU institutions and member states.
- **December 2021** — Log4Shell vulnerability triggers global emergency response.
- **September 2021** — Von der Leyen announces CRA in State of the Union speech.
- **October 2021** — Radio Equipment Directive delegated act adopted as stopgap for wireless devices.
- **15 September 2022** — Commission publishes CRA proposal (COM/2022/454).
- **April 2023** — Eclipse, Linux Foundation and others publish open letter against open-source liability.
- **19 July 2023** — Council adopts negotiating mandate.
- **30 November 2023** — Political agreement reached in trilogue.
- **12 March 2024** — European Parliament adopts text with 517 votes in favour, 12 against, 78 abstentions.
- **10 October 2024** — Council formally adopts the regulation.
- **20 November 2024** — Published in Official Journal as Regulation (EU) 2024/2847.
- **10 December 2024** — Entry into force.
- **11 September 2026** — Vulnerability reporting obligations apply.
- **11 December 2027** — Full application of all obligations.

## Impact and consequences

The regulation captures an estimated 100,000 to 380,000 product types and forces a structural change in how software is shipped. The Commission's own impact assessment projected compliance costs of €29 billion against expected savings of €180–290 billion in avoided incidents. Hardware manufacturers face the steepest adjustments: companies that previously shipped routers or webcams with hardcoded passwords and abandoned firmware after 18 months must now run vulnerability disclosure programmes and commit to multi-year update support.

Chinese consumer electronics brands selling on Amazon and AliExpress — long criticised by ENISA for shipping insecure IoT devices — face the most direct disruption, since CE marking now requires substantive cybersecurity compliance, not just paperwork. US cloud and software vendors including Microsoft, Google and Cisco have publicly aligned roadmaps with CRA timelines; Microsoft's Secure Future Initiative, launched in November 2023, was explicitly framed against the CRA backdrop. The German BSI and France's ANSSI are positioning to become the dominant market surveillance authorities, building on existing certification regimes.

The open-source carve-out, while welcomed by maintainers, created a new legal category — the "open-source software steward" — whose obligations remain to be clarified through Commission guidance and harmonised standards. CEN-CENELEC and ETSI received standardisation requests in 2024 to develop the technical specifications underpinning the essential requirements, building on ETSI EN 303 645 for consumer IoT.

## Key questions answered

### Why does the CRA (Regulation (EU) 2024/2847) use CE marking instead of a new cybersecurity label?

CE marking is the EU's universal conformity tool for products on the single market, with established market surveillance infrastructure in every member state. Bolting cybersecurity onto the existing system avoided creating a parallel bureaucracy and let the Commission leverage 30 years of New Legislative Framework practice. It also signals to manufacturers that cybersecurity is now a basic product-safety attribute, like electrical safety or EMC compliance.

### Why did open-source maintainers push back so hard on Regulation (EU) 2024/2847?

The original draft would have made anyone who placed software "on the market" — including unpaid maintainers of widely used libraries — liable for compliance, vulnerability handling and CE-marking obligations. Given that critical infrastructure runs on volunteer-maintained projects like OpenSSL, curl and Log4j, maintainers feared personal liability would force them to abandon European users or stop publishing entirely. The final text exempts non-commercial development and creates lighter obligations for "stewards" — typically foundations like Apache or Eclipse.

### Why a 24-hour vulnerability reporting window in Regulation (EU) 2024/2847?

Breton and Parliament negotiators argued that actively exploited vulnerabilities are time-critical: attackers move within hours, so ENISA needs early visibility to coordinate cross-border response. Critics including the Center for Cybersecurity Policy and Law warned the window was tighter than US CISA reporting (72 hours under CIRCIA) and could create a database of unpatched vulnerabilities — a high-value target. The compromise: report the existence and exploitation status within 24 hours, full technical details only once mitigations are available.

## Official sources

- [Regulation (EU) 2024/2847 — Official Journal](https://eur-lex.europa.eu/eli/reg/2024/2847/oj)
- [Commission CRA page](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)
- [ENISA Threat Landscape reports](https://www.enisa.europa.eu/publications/enisa-threat-landscape-2021)