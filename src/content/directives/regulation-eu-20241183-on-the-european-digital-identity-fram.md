---
title: "Regulation (EU) 2024/1183 on the European Digital Identity Framework (eIDAS 2)"
directive: "2024/1183/EU"
category: "Digital & Data"
year: 2024
tags: [digital-identity, electronic-signatures, data-protection, trust-services, digital-wallet, eidas]
summary: "The eIDAS 2 Regulation introduces the European Digital Identity Wallet, a mandatory cross-border digital identity framework for EU member states, aiming to give citizens control over personal data while enabling secure online transactions across the bloc."
status: "in-force"
related: ["2016/679/EU", "2022/2555/EU"]
llm: "deepseek-chat"
---

## What is it?

The eIDAS 2 Regulation replaces the original eIDAS Regulation (910/2014/EU) and establishes a binding framework for a European Digital Identity Wallet — a personal digital wallet that every EU member state must offer to its citizens and residents by 2026. The wallet will allow users to store and share identity attributes, diplomas, driver's licenses, medical prescriptions, and other credentials for both online and offline verification, using blockchain-like decentralised identifiers.

A critical innovation is the concept of "qualified electronic attestation of attributes" — meaning that third-party issuers (such as universities, banks, or health authorities) can digitally certify specific claims (e.g., "over 18" or "licensed to drive") without revealing the underlying data. The regulation also mandates that the wallet be non-profilable, meaning relying parties cannot track a user's wallet usage across services, and imposes strict data minimisation through selective disclosure.

The original eIDAS framework from 2014 was notification-based: member states could notify their national electronic ID schemes to be recognised cross-border, but adoption was voluntary and fragmented. Only 23 member states notified schemes by 2023, and usage remained low — according to a 2023 Commission report, only 14% of EU citizens had ever used a cross-border eID scheme. eIDAS 2 makes the wallet mandatory for member states and requires large private-sector platforms (such as social media, banks, and cloud providers) to accept the wallet for user authentication and document verification.

## Why was it introduced?

The Commission's 2017 review of the original eIDAS Regulation had already flagged low uptake: only 14 member states had notified schemes, and cross-border usage was "negligible" according to the Commission's 2017 implementation report. The structural tension was clear: the 2014 framework had been written for a world where electronic signatures and identity cards existed, but not for the rise of identity theft, data breaches, and the dominance of US and Chinese digital identity providers (Apple Sign-In, Google Sign-In, WeChat).

The decisive trigger came in 2019-2020 with the COVID-19 pandemic. As millions of Europeans suddenly needed digital health passes, vaccination certificates, and secure remote access to government services, the patchwork of national solutions — France's TousAntiCovid, Germany's CovPass, Italy's Immuni — proved incompatible and costly. The German government, then led by Angela Merkel, pushed for a common EU digital identity solution as a digital sovereignty project alongside its EU Council presidency in the second half of 2020. The pandemic also exposed the inadequacy of paper-based identity verification for cross-border healthcare: the Commission's 2020 Digital Finance Strategy cited a 300% increase in online identity fraud in the EU during the first wave of COVID‑19.

The political coalition for eIDAS 2 was unusual. On one side, digital rights groups (led by European Digital Rights, EDRi) and the European Data Protection Supervisor (EDPS, then Wojciech Wiewiórowski) argued strongly for privacy-by-design, demanding that the wallet be "non-traceable" and fully decentralised. On the other side, large technology companies — Apple, Google, and Meta — opposed mandatory acceptance by their platforms, warning of "significant implementation costs" and "fragmentation" via their lobby group Digital Europe. The financial sector, represented by the European Banking Federation (EBF), supported the wallet as an anti-fraud tool: banks estimated that identity fraud cost the EU banking sector €1.2 billion annually in 2021, according to the EBF's 2021 position paper.

The European Parliament's internal market committee (IMCO) was the lead committee, with rapporteur MEP Romana Jerković (S&D, Croatia). The key fight in Parliament was over the "mandatory acceptance" clause for large private-sector platforms. The EPP group and some centre-right MEPs wanted to exempt small platforms; the Greens and S&D insisted on full coverage. The compromise, reached in March 2024, was that providers of "large online platforms" (as defined under the Digital Services Act, i.e., those with over 45 million EU users) would be required to accept the wallet for user authentication — but not for identification of anonymous use (e.g., browsing without logging in). The Council, led by the rotating Spanish presidency, agreed to this in December 2023.

The Commission, under President Ursula von der Leyen and Internal Market Commissioner Thierry Breton, used the 2021 "Digital Compass" strategy to frame eIDAS 2 as essential to digital sovereignty. Breton explicitly argued in a 2021 speech that "Europe cannot depend on Silicon Valley to decide who we are online." The Commission's 2021 impact assessment estimated that the wallet would generate €40-60 billion in economic benefits over 10 years by reducing identity fraud, enabling cross-border e-government, and cutting administrative costs for businesses — though these figures were contested by member states' own estimates, with Germany's finance ministry privately questioning the methodology.

A last-minute amendment in the trilogues added a provision requiring that the wallet's source code be fully open-source, after the EDPS warned in a 2022 opinion that proprietary code would violate the transparency requirement of the GDPR. Sweden and the Netherlands pushed for interoperability with existing national digital ID systems (BankID in Sweden, DigiD in the Netherlands) rather than requiring a new separate wallet — the final text allows member states to interoperate their existing schemes.

## Timeline

- **2014** — Original eIDAS Regulation (910/2014/EU) enters into force, establishing voluntary electronic identification and trust services framework
- **2017** — Commission review finds only 14 member states notified schemes; cross-border usage "negligible"
- **2019** — European Court of Justice ruling in Case C-181/18 (Nowak) on electronic identification during airport security sparks debate on digital identity rights
- **2020** — COVID-19 pandemic breaks; health pass fragmentation exposes lack of common digital identity
- **June 2021** — Commission publishes proposal for eIDAS 2 as part of the "Digital Compass" strategy
- **September 2021** — German government (Merkel's caretaker cabinet) signals strong support; French presidency of the Council (2022) prioritises the file
- **March 2022** — European Parliament IMCO committee adopts draft report; EDRi and EDPS publish critical opinions on privacy safeguards
- **December 2022** — Council (digital ministers) adopts general approach with compromise on mandatory acceptance for large platforms
- **December 2023** — After trilogues, political agreement reached on final text
- **February 2024** — Regulation formally adopted by the Council and European Parliament
- **May 2024** — Official publication in the Official Journal of the EU
- **2026** — Application deadline for member states to issue wallets to citizens (subject to delegated acts)
- **2030** — Full compliance deadline for all private-sector relying parties

## Impact and consequences

The most immediate consequence is that, by 2026, each of the 27 member states must offer a European Digital Identity Wallet to its citizens — either as a standalone app or integrated into existing national ID schemes. This affects an estimated 450 million EU citizens, though early adopters like Finland and Estonia have already begun piloting wallet prototypes (the "European Wallet Ecosystem" pilot with 250 companies from 19 member states started in April 2023).

For the large online platforms — Google, Apple, Meta (Facebook/Instagram), Amazon, Microsoft, TikTok (ByteDance), and X (Twitter) — the mandatory acceptance requirement means they must modify their authentication flows to allow users to log in or verify age/identity using the EU wallet instead of "Sign in with Google" or "Sign in with Apple." Apple and Google had lobbied against this, arguing that their existing sign-in systems were more privacy-preserving; digital rights groups countered that these systems still gave the companies access to users' behaviour data. The regulation does not apply to mandatory acceptance for anonymous browsing, only for cases where the platform requires identity verification (e.g., for age-gated content, financial services, or high-value transactions).

The German government, under Chancellor Olaf Scholz, faced a particular challenge: Germany's national digital ID infrastructure (the eID function of the Personalausweis) has been chronically underused — only 10% of German citizens had activated it by 2023, according to Germany's Federal Office for Information Security (BSI). The federal government allocated €2.5 billion in its 2023 budget for digitalisation, with the wallet as a centrepiece. In contrast, Sweden's BankID, already used by 8 million Swedes daily, will be interoperable under eIDAS 2 — Sweden's finance minister Elisabeth Svantesson hailed this as "a win for user convenience."

The regulation's impact on small and medium enterprises (SMEs) is mixed. The Commission's 2021 impact assessment claimed that the wallet would save SMEs "up to €10,000 annually per company" in identity verification costs, but the Federation of European Independent IT Companies (FEDIT) warned that implementation costs for smaller platforms could exceed €50,000 per company. The final text exempts micro-enterprises (under 10 employees) from mandatory acceptance obligations.

A notable controversy erupted in 2023 over the "qualified website authentication certificate" provisions — a holdover from the original eIDAS that allowed SSL/TLS certificate issuers to be regulated by EU trust services. Google and Mozilla objected, arguing this could weaken web security; the compromise was that QWACs would remain voluntary, not mandatory, for web browsers.

## Key questions answered

### Why did the rule forcing big private platforms to accept EU digital IDs pass despite Big Tech opposition?

The coalition between digital rights advocates and MEPs from the Greens/S&D groups was decisive. The Greens argued that mandatory acceptance would "democratize digital identity" and break the oligopoly of US-based identity providers. The European Data Protection Supervisor (EDPS) provided legal cover by issuing a formal opinion in 2022 stating that mandatory acceptance did not violate the Charter of Fundamental Rights if the wallet was designed for non-traceability. Faced with this alliance, the EPP group's initial resistance gave way to the compromise that only "very large online platforms" (over 45 million EU users) would be required to accept the wallet.

### Why did Germany push so hard for new EU digital ID rules even though few Germans use its own national digital ID?

Germany's motivation was fundamentally about digital sovereignty and avoiding dependence on US cloud providers. After the 2013 Snowden revelations and the 2020 Schrems II ruling (C-311/18) invalidating the Privacy Shield, the German federal government — particularly under the 2021 traffic-light coalition of SPD, Greens, and FDP — saw a European digital identity as a geostrategic asset. The German Federal Ministry for Digital and Transport (then led by Volker Wissing, FDP) argued that "if we don't build an EU identity wallet, Chinese and American companies will define Europe's digital identity," according to a 2022 strategy paper. Additionally, the EU's NextGenerationEU recovery fund allocated €3.2 billion to Germany for digital infrastructure, making the wallet a financially viable project.

### Why does the new EU digital wallet have to be open-source?

The EDPS opinion of 2022 explicitly warned that proprietary code for the wallet would violate the transparency requirement of Article 5(2) GDPR (the "principle of transparency"). EDRi and the Free Software Foundation Europe (FSFE) mounted a coordinated campaign during the trilogues, arguing that closed-source identity infrastructure would be untrustworthy. The European Commission's Joint Research Centre (JRC) had also published a 2021 study showing that 90% of identity-related security vulnerabilities in digital ID systems were found through open-source audits. The final text requires the wallet's reference implementation to be open-source under a standard license (EUPL v1.2).

### Will people actually use the new EU digital wallet?

The regulation makes the wallet mandatory for member states to offer, but not for citizens to use — it remains voluntary for individuals. The Commission's 2021 impact assessment optimistically projected 80% of EU citizens would use the wallet by 2030, but this was based on user surveys where 70% expressed "willingness" — not actual behaviour. The experience of Germany's electronic ID card (which had only 10% activation after 12 years) suggests that take-up may depend heavily on use cases: if private-sector platforms are required to accept it, and if it simplifies healthcare, travel (digital driver's license), and banking, adoption could be higher than previous national schemes. Estonia, which already had a mandatory e-ID for its 1.3 million citizens, provides a positive reference: 98% of Estonians use their digital ID for tax filing, voting, and banking. The pilot phase (April 2023-2025) involving 250 companies across 19 member states will provide the first real-world data on usability.

## Official sources

- [Regulation (EU) 2024/1183 of the European Parliament and of the Council of 11 March 2024 amending Regulation (EU) No 910/2014 as regards establishing the European Digital Identity Framework](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [European Commission — European Digital Identity Wallet page](https://ec.europa.eu/digital-building-blocks/sites/display/EUDIGITALIDENTITYWALLET/Home)
- [eIDAS Expert Group — Implementation documentation and delegated acts](https://ec.europa.eu/digital-building-blocks/sites/display/EIDCOMMUNITY/Home)
- [EDPS Opinion 5/2022 on the proposal for eIDAS 2](https://edps.europa.eu/data-protection/our-work/publications/opinions/2022/opinion-52022-european-digital-identity_en)
- [European Commission — Digital Compass 2030 (2021)](https://ec.europa.eu/info/strategy/priorities-2019-2024/europe-fit-digital-age/europes-digital-compass_en)