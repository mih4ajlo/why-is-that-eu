---
title: "Payment Services Directive 2 (PSD2)"
directive: "2015/2366/EU"
category: "Financial"
year: 2018
tags: [open-banking, consumer-protection, payment-services, data-privacy, financial-regulation, strong-customer-authentication]
summary: "PSD2 transformed European payments by requiring banks to open customer data to third-party providers via APIs, enabling new fintech services while mandating stronger security through two-factor authentication."
status: "in-force"
related: ["2016/679/EU", "2007/64/EC", "2018/389/EU"]
llm: "deepseek-chat"
---

## What is it?

PSD2 is the European Union’s second Payment Services Directive, which came into force on 13 January 2018, with full application required by 14 September 2019. It replaced the original 2007 Payment Services Directive (PSD1) and fundamentally reshaped the European payments landscape. At its core, PSD2 introduced two revolutionary requirements: banks must grant licensed third-party providers (TPPs) access to customers’ payment accounts via open APIs (Application Programming Interfaces), and all electronic payments must use strong customer authentication (SCA) — typically a combination of something the user knows (password), something they have (phone), and something they are (fingerprint).

The directive created two new categories of regulated financial players: Account Information Service Providers (AISPs), which can aggregate a customer’s account balances across multiple banks, and Payment Initiation Service Providers (PISPs), which can initiate payments directly from a user’s bank account without requiring a credit or debit card. This opened up possibilities like using a fintech app to pay an online merchant directly from a bank account, bypassing traditional card networks, and seeing all bank accounts in a single dashboard.

## Why was it introduced?

The trigger for PSD2 was not a single scandal but the European Commission’s recognition that PSD1, enacted in 2007, had failed to anticipate two intertwined trends: the explosion of online and mobile payments, and the rise of fintech competitors that were being blocked by banks from accessing account data. According to the Commission’s 2015 impact assessment (SWD(2015) 214 final), the online payment market was growing at around 18% annually, yet security incidents had risen by 37% between 2011 and 2013, and fraud rates for card-not-present transactions were three times higher than for face-to-face payments.

The structural tension was clear: PSD1 had created a single market for payment services but had exempted “account information services” and “payment initiation services” from regulation. This meant fintechs like the German company Sofort (later acquired by Klarna), Trustly in Sweden, and the Dutch firm iDEAL operated in a legal grey zone, obtaining customer bank credentials through screen-scraping — a security nightmare. Banks fiercely resisted giving up data, arguing it violated the 1995 Data Protection Directive.

The coalition that passed PSD2 was unusual: consumer groups, fintech startups, and large retailers aligned against incumbent banks. The European Consumer Organisation (BEUC) lobbied for open access, arguing that consumers should control their own financial data. The European Banking Authority (EBA) supported stronger security rules. The retail sector, led by the European Retail Round Table (ERRT), pushed for lower transaction costs — according to the Commission’s 2013 evaluation of PSD1, card payment fees in the EU ranged from 0.2% to 1.5%, far higher than in countries like Australia.

The political breakthrough came under Internal Market Commissioner Michel Barnier (2010–2014), who made PSD2 a priority. Barnier’s proposal in July 2013 explicitly stated that “the directive should put an end to the current legal uncertainty” for payment initiation and account information services. The European Parliament’s rapporteur was Eva Joly (Greens/EFA), who pushed for strong consumer protections.

Timing was crucial: the 2013 publication of the European Commission’s “Green Paper on Retail Financial Services” had documented that 70% of EU consumers had never switched bank accounts, and cross-border payments remained fragmented. The 2015 approval of the General Data Protection Regulation (GDPR) provided a parallel framework for data rights, making banks’ resistance harder to sustain. The vote in the European Parliament on 8 October 2015 was decisive: 583 in favour, 20 against, 25 abstentions.

What changed from earlier failed attempts? PSD1 had been limited in scope, and a 2012 Commission consultation had shown that only 38% of respondents supported mandatory API access. But by 2014, the success of the UK’s “Midata” project — where the UK government had pressured nine major banks to share transaction data — demonstrated the model was feasible. The EBA’s 2014 “Opinion on the use of e-ID and the security of payments” provided the technical blueprint for strong customer authentication.

## Timeline

- **2007** — PSD1 (2007/64/EC) comes into force, creating a single market for payment services but exempting account information and payment initiation services.
- **2012** — European Commission publishes a public consultation on PSD1 review, revealing that 57% of respondents agreed fraud levels were increasing.
- **2013** — Internal Market Commissioner Michel Barnier proposes PSD2 on 24 July 2013, with a draft directive and a companion Regulation on interchange fees (2015/751).
- **2014** — European Banking Authority issues Opinion on security of payments, laying the groundwork for SCA technical standards.
- **2015** — European Parliament adopts PSD2 on 8 October 2015 (583-20-25). Council of the EU adopts the directive on 16 December 2015.
- **2016** — PSD2 published in the Official Journal of the European Union on 23 December 2015.
- **2018** — Entry into force on 13 January 2018. Member states must transpose into national law by 13 January 2018.
- **2019** — Full application deadline on 14 September 2019. Commission adopts Delegated Regulation (2018/389/EU) on Regulatory Technical Standards for SCA and secure communication.
- **2020** — European Banking Authority issues final guidelines on the use of screen-scraping, requiring banks to provide dedicated interfaces (APIs) by 14 March 2021.
- **2022** — EBA reports that 12 member states had not fully transposed PSD2, and several failed to meet SCA compliance deadlines. The Commission opens infringement proceedings against Bulgaria, Cyprus, Greece, Poland, and Slovenia.
- **2023** — European Commission launches a review of PSD2, with a PSD3 proposal expected in 2024.

## Impact and consequences

The immediate effect of PSD2 was a surge in fintech licensing. According to the EBA’s 2023 Register of Payment Institutions, as of December 2023, there were over 4,800 regulated payment institutions in the EU, of which roughly 200 were AISPs and 150 were PISPs — many created after 2018. The UK’s Financial Conduct Authority reported that by 2022, over 5 million UK consumers were using open banking services, though the UK had left the EU in 2020 and implemented PSD2 as part of retained EU law.

The most controversial element was SCA. Online merchants and payment processors warned the Commission that requiring two-factor authentication for every transaction would break checkout flows. According to a 2021 study by the payments consultancy The Paypers, cart abandonment rates in Europe rose by an estimated 15-20% in the first months of SCA enforcement. The European Banking Authority granted a transition period until December 2020, and allowed exemptions for low-value transactions (under €30) and transactions deemed low-risk based on historical fraud analysis.

Banks fought API access with delay tactics. Many banks initially offered only screen-scraping as an option, then provided poorly documented APIs. The EBA’s 2020 Opinion on the use of APIs found that “several banks” had not complied with the requirement to provide a dedicated interface. The Commission referred the matter to the EBA for further guidelines in 2021.

Revenue effects were significant. According to a 2023 report by McKinsey & Company, open banking — driven largely by PSD2 — could generate €30-50 billion in annual revenue for European banks by 2025, but also cost them €10-20 billion in lost payment revenues as customers moved to fintech apps. The card networks (Visa and Mastercard) faced disruption: PISPs offered an alternative to card payments, though adoption remained niche. By 2023, PISP-initiated payments accounted for less than 5% of online transactions in most EU markets, except in Germany and the Netherlands.

## Key questions answered

### Why do banks have to let other companies access your account data?

PSD2 requires banks to provide account access because the Commission concluded that consumers should control their own financial data, not their bank. The 2013 proposal argued that a bank “should not be allowed to refuse payment initiation or account information services” when the customer has explicitly consented. This was modelled after the UK’s 2013 “Midata” scheme, where the government forced banks to share data to stimulate competition. The EBA’s 2017 guidelines confirmed that banks could not use “security reasons” as a blanket excuse to block API access.

### Why didn't the rules that let companies access bank data stop the Wirecard fraud?

PSD2 imposed security and licensing rules, but it did not prevent the 2020 collapse of German payment processor Wirecard, which had €1.9 billion in missing cash. The scandal exposed that BaFin, the German regulator, had granted Wirecard a payment institution license under PSD2 despite warnings. The European Commission’s 2022 “Payment Services Review” explicitly noted that PSD2’s national “passporting” regime — where a license in one member state allows operation across the EU — proved inadequate without stronger supervisory coordination. The review proposed creating a “European Payment Services Authority” to centralise oversight, a key driver of the proposed PSD3.

### Why do you still need extra security steps for tiny online payments?

The requirement for SCA on transactions below €30 is not automatic: the delegated regulation (2018/389) allows exemptions for low-value payments, recurring transactions of identical amounts, and transactions to trusted beneficiaries. But the EBA made SCA mandatory for remote payments unless the merchant can prove fraud rates below 0.13% for card-not-present transactions. This was based on data showing that fraud rates for small transactions were disproportionately high: the Commission’s 2015 impact assessment estimated that fraud on card-not-present transactions under €30 was 0.18%, five times the rate for face-to-face payments of the same value.

## Official sources

- [Payment Services Directive (PSD2) — Directive (EU) 2015/2366](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32015L2366)
- [Delegated Regulation on strong customer authentication (EU) 2018/389](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32018R0389)
- [European Banking Authority’s Register of Payment Institutions](https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money/registers)
- [European Commission’s 2013 PSD2 Impact Assessment SWD(2015) 214 final](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52015SC0214)
- [European Banking Authority’s 2014 Opinion on the security of payments](https://www.eba.europa.eu/sites/default/documents/files/documents/10180/657314/2e8e6e76-e50a-4f71-a1b9-96c7f3e723f7/EBA-Op-2014-09%20Opinion%20on%20e-ID%20and%20Security.pdf)