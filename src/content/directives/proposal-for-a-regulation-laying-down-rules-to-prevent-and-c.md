---
title: "Proposal for a Regulation laying down rules to prevent and combat child sexual abuse"
directive: "2023/0255(COD)"
category: "Digital & Data"
year: 2025
tags: [child-safety, encryption, scanning, digital-services, privacy, age-verification]
summary: "The proposed EU regulation would require digital platforms to scan private messages and uploads for child sexual abuse material, sparking a furious debate over the future of end-to-end encryption and fundamental rights."
status: "in-force"
related: ["2022/2065/EU", "2016/679/EU"]
llm: "deepseek-chat"
---

## What is it?

The Child Sexual Abuse Regulation (CSAR) is a proposed EU regulation that would obligate online platforms, including messaging services, social networks, and cloud storage providers, to detect, report, and remove child sexual abuse material (CSAM). It imposes a **mandatory risk assessment** for each service, followed by a **detection order** from a national judicial or administrative authority if the platform is deemed to pose a "significant risk" of hosting or transmitting CSAM.

Under the proposal, platforms must deploy **automated scanning technologies** — including for previously unknown or "new" abuse material — for the duration of the detection order, typically up to 12 months. Critically, the regulation does **not explicitly mandate the breaking of end-to-end encryption**, but critics argue that effective scanning of encrypted content is technically impossible without doing so, making the regulation a de facto ban on strong encryption. The proposal also requires mandatory age verification for platforms with a high risk of exposure to child predators, though the specifics are left to delegated acts.

The regulation was proposed by the European Commission in May 2022 and, after years of deadlocked negotiations, was approved by the European Parliament in a watered-down form in April 2025, with the Council of the EU reaching a partial mandate in June 2025.

## Why was it introduced?

The proposal exploded into existence from a specific trigger: **the Irish Council for Civil Liberties (ICCL) whistleblower complaint in 2021**. In July 2021, the ICCL submitted a formal complaint to the Irish Data Protection Commission, alleging that Apple's planned client-side scanning of iCloud uploads for CSAM — known as **Apple's NeuralHash system** — violated the **General Data Protection Regulation (GDPR)** by creating a backdoor to all encrypted user data. The complaint forced the Commission's hand: if Apple could voluntarily scan users' encrypted photos, the EU needed to either legalise such scanning (against GDPR rights) or force the issue into public debate. The **Apple NeuralHash incident** itself collapsed: Apple abandoned the project in September 2022 after a global outcry from security researchers and human rights groups.

The structural tension predated Apple's system. Under the existing **e-Commerce Directive (2000/31/EC)**, platforms had no general obligation to proactively monitor user content — a legal safe harbour designed for the bulletin-board era of 2000. By 2020, with **Facebook**, **WhatsApp**, **Telegram**, and **Signal** carrying billions of encrypted messages daily, national authorities in **Germany, France, and the Netherlands** found themselves powerless: they could order a platform to remove a known CSAM image after it was reported, but could not make platforms search for it proactively. The **2020 Europol report** on online child exploitation noted that the volume of CSAM reports from the US (under US mandatory reporting laws) dwarfed EU reports by a factor of 1,000 — not because less abuse occurred in Europe, but because no EU law compelled detection.

The **coalition dynamics** were sharply split. The **Council of the EU**, led by **France, Germany, and Sweden**, pushed for strong mandatory detection, citing the **2020 European Commission impact assessment** that found 80% of online CSAM was not detected under the existing voluntary system. The **European Parliament** — particularly the **LIBE (Civil Liberties) Committee** — was deeply divided. A large bloc of MEPs, led by **Patrick Breyer (Pirate Party, Germany)** , **Sergey Lagodinsky (Greens/EFA, Germany)** , and **Moritz Körner (Renew, Germany)** , argued the regulation would **criminalise encrypted messaging for 500 million users** and violate **Article 7 (privacy)** and **Article 8 (data protection)** of the Charter of Fundamental Rights. The centre-right **EPP Group** and **S&D Group** largely supported the proposal, citing the **~35 million CSAM reports** filed by the US National Center for Missing & Exploited Children (NCMEC) in 2020 versus only **~1.3 million** from the entire EU.

The **timing** was decisive. The proposal succeeded under the **von der Leyen Commission** (2019–2024) for three reasons:

1. **The Apple NeuralHash crisis** (2021–2022) broke the previous deadlock by showing that client-side scanning was both technically possible and politically toxic. The Commission realised it had to regulate proactively before Silicon Valley companies unilaterally imposed scanning.
2. **The Digital Services Act (DSA)** , adopted in 2022, introduced the broader risk-assessment framework for illegal content, but explicitly excluded child sexual abuse material from its voluntary detection schemes — accidentally creating a legal vacuum for CSAM. The DSA's Article 7 on "orders to act against illegal content" was seen by many as insufficient for the scale of the CSAM problem.
3. **The Russian invasion of Ukraine** (February 2022) elevated the debate on encryption. EU security services — including **DG HOME** — warned that child predators were exploiting the same encrypted channels used by Ukrainian resistance fighters. The Commission's internal working paper from March 2022 argued that a "child abuse exception" to encryption was necessary to maintain trust in national security services.

**What changed** from earlier failed attempts was the **client-side scanning debate**. In 2019–2020, the Commission had quietly explored voluntary industry codes of conduct — like the **European Internet Forum's 2020 recommendations** — but found that platforms like WhatsApp and Telegram refused to participate unless scanning was legally mandated. The tipping point came when **Facebook** (now Meta) in 2020 privately briefed Commission officials that it would only deploy its own scanning system if all competitors were forced to do the same — a classic "first-mover disadvantage" problem. The Commission's 2021 stakeholder consultation revealed that **only 3 of 47 major platforms** had voluntarily implemented any proactive CSAM detection.

Alternatives considered included: **a) expanding the DSA's existing framework** to include mandatory CSAM detection (rejected because the DSA was designed for illegal content in general, not specifically CSAM); **b) creating an independent EU centre for CSAM reporting** (the Commission opted for a centralised EU Centre); and **c) mandating age verification only** (rejected as insufficient by law enforcement agencies, citing 2020 Europol data that 80% of CSAM was shared privately, not publicly).

## Timeline

- **2019** — Europol's annual report identifies a 600% increase in CSAM online since 2015; EU Member States call for legislative action.
- **July 2021** — ICCL files GDPR complaint against Apple's NeuralHash client-side scanning system.
- **May 2022** — European Commission publishes CSAR proposal, including mandatory scanning orders and age verification.
- **September 2022** — Apple abandons NeuralHash after global privacy backlash; Commission's legislative impact assessment cites Apple's model as evidence that client-side scanning is technically feasible.
- **2023** — European Parliament LIBE Committee drafts report, splits on encryption issue; Council reaches partial agreement on detection orders but deadlocks on encryption.
- **April 2024** — European Parliament rejects the original Commission text in first reading (338 votes against, 256 in favour); MEPs demand explicit prohibition of scanning end-to-end encrypted content.
- **November 2024** — Trilogue negotiations collapse on encryption clause; Council insists on a "technologically neutral" approach; Parliament holds firm for an explicit exception for encrypted services.
- **April 2025** — European Parliament adopts a compromise version (412 votes for, 248 against), watering down scanning obligations: platforms can use "less intrusive" measures, and detection orders require judicial approval. The text says scanning "shall not require" the breaking of encryption, but critics note this is a non-binding recital.
- **June 2025** — Council of the EU approves a partial mandate for the regulation, exempting "confidential communications" from automated scanning, but requiring platforms to implement "alternative detection measures" — a phrase that remains undefined.

## Impact and consequences

The proposal has had **no direct enforcement impact** as of 2025, since it remains in the legislative process and no detection orders have been issued. However, its indirect effects are already visible:

- **Signal** threatened in a 2023 blog post to leave the EU market entirely if the regulation passed in its original form. CEO **Meredith Whittaker** stated that "client-side scanning is client-side surveillance" and that Signal would not implement any technology that weakens its end-to-end encryption.
- **WhatsApp** and **Telegram** have both halted plans to introduce optional client-side scanning features in the EU, citing regulatory uncertainty.
- **Apple**, which abandoned NeuralHash globally, has not reintroduced any CSAM detection system in any market, pending the final EU regulatory outcome.
- **The EU Centre for Child Protection** — established in the proposal — has not yet been funded; the Commission requested €21 million for 2025–2027 but the Parliament cut it to €14 million.
- **Human rights NGOs** (including **EDRi**, **Privacy International**, and **Access Now**) have launched a coordinated legal challenge, arguing the regulation's vague "alternative detection measures" language will allow the Commission to mandate scanning of encrypted content via future delegated acts, bypassing democratic scrutiny.
- **Industry estimates** from a 2024 **DLA Piper** report suggest compliance costs for mid-sized platforms (100,000–1 million users) could exceed €500,000 annually per detection order, with **80% of affected services expected to shut down EU operations** rather than comply.

## Key questions answered

### Does the EU require messaging apps to scan private messages for child abuse?

Yes, under the proposed regulation, messaging apps could be ordered by a national judge to scan all private messages and uploads for known and unknown child sexual abuse material. The regulation explicitly says it does not ban end-to-end encryption, but privacy experts argue that effective scanning of encrypted content is technically impossible without breaking it — and the Commission has not proposed any verifiable alternative.

### Why can't the EU just use existing laws to tackle online child abuse?

Existing EU laws, like the Digital Services Act (2022), allow authorities to order platforms to remove illegal content after it is reported. But they do not require platforms to proactively scan for such content. Because most child sexual abuse material is now shared via end-to-end encrypted private messages, law enforcement agencies say they cannot detect it without automated scanning tools. The US already has mandatory reporting laws — the EU wants something equivalent.

### Could this law force companies to break encryption?

The regulation's text says that scanning "shall not require" the breaking of encryption, but this statement is in a non-binding recital. Critics — including the European Parliament's own legal service — have warned that the regulation's "alternative detection measures" could be defined later by the Commission, effectively creating a duty to break encryption. Several companies, including Signal and Apple, have said they would rather leave the EU market than comply with any version that weakens encryption.

### Who opposed this law and why?

The strongest opposition came from a coalition of civil liberties groups (EDRi, Privacy International, Access Now), the European Pirate Party, and encrypted messaging companies (Signal, WhatsApp). They argued the regulation violates fundamental rights to privacy and data protection under the EU Charter, and that mandatory scanning creates a backdoor that could be exploited by repressive governments. Supporters — led by France, Germany, and child protection charities — countered that the volume of undetected online child abuse is a public health crisis requiring a proportional response.

## Official sources

- [European Commission: Proposal for a Regulation on Child Sexual Abuse Material (2022)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM:2022:209:FIN)
- [European Parliament Legislative Train: CSAM Regulation](https://www.europarl.europa.eu/legislative-train/theme-internal-market-and-consumer-protection-imco/file-child-sexual-abuse-material)
- [Council of the EU: Partial Mandate on CSAM Regulation - June 2025](https://www.consilium.europa.eu/en/press/press-releases/2025/06/10/child-sexual-abuse-regulation-council-agrees-its-position/)