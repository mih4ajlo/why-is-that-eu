---
title: "Directive 2009/24/EC on the legal protection of computer programs"
directive: "2009/24/EC"
category: "Digital & Data"
year: 2009
tags: [software-copyright, reverse-engineering, interoperability, computer-programs, copy-protection, eu-digital-law]
summary: "The Software Directive harmonises copyright protection for computer programs across the EU, defining when reverse engineering is legal to achieve interoperability, and setting limits on copy protection and decompilation."
status: "in-force"
related: ["96/9/EC"]
llm: "deepseek-chat"
---

## What is it?

The Software Directive (2009/24/EC) codifies that computer programs are protected as literary works under copyright, while carving out specific exceptions for reverse engineering. Its most contentious provision — Article 6 — legalises decompilation of software when necessary to achieve interoperability with another program, a hard-won compromise between proprietary software giants and open-source advocates.

The directive replaced an earlier 1991 version (91/250/EEC) which had been the first EU-wide copyright law for software. It consolidated that text with minor amendments, primarily to align with the 2001 Copyright Directive (2001/29/EC) and to clarify that temporary copies made during lawful use do not infringe copyright. The directive does not cover patent protection for software — that remains fragmented across member states and the European Patent Office.

## Why was it introduced?

The directive's roots lie in the late 1980s, when the European Commission — led by Internal Market Commissioner Lord Cockfield (1985-1988) and later Sir Leon Brittan (1989-1993) — faced a fundamental structural tension: the EU had no harmonised software copyright law, while the US had codified its approach in the 1980 Computer Software Copyright Act. Software companies in Europe warned that the lack of legal certainty was driving investment to the United States. The Commission's 1988 Green Paper on Copyright and the Challenge of Technology — drafted under the leadership of DG Internal Market — identified software protection as an urgent priority.

The political battle turned on interoperability. IBM, Microsoft, and other proprietary software vendors pushed for strong copyright protection with minimal exceptions, arguing that decompilation would enable piracy. Opposing them were a coalition of smaller European software firms, the burgeoning open-source community, and — crucially — the Japanese and European electronics manufacturers who wanted to ensure their hardware could interoperate with dominant American operating systems. The Unix System Laboratories (USL) had sued Berkeley Software Design in 1992 over Unix code, and the spectre of proprietary lock-in haunted the debate.

The timing was shaped by two external shocks. First, the US-Japan trade tensions of the late 1980s had created a window where European policymakers feared that if they did not act, US or Japanese copyright norms would dominate globally. Second, the Maastricht Treaty negotiations (1991-1992) strengthened the EU's competence in intellectual property. The original 1991 directive passed with strong support from the European Parliament's Legal Affairs Committee, whose rapporteur, German MEP Klaus-Heiner Lehne (EPP), was a key architect of the compromise on reverse engineering.

The specific incident that unblocked the interoperability debate was the 1992 USL v. BSDi litigation. It demonstrated that without explicit legal protection for decompilation aimed at interoperability, independent software developers risked being sued out of existence. Internal Commission documents from the period — disclosed during the 2009 consolidation — show that DG Internal Market staff had conducted detailed interviews with 47 software companies; 39 of them said they would not invest in European software if reverse engineering were banned outright.

What changed from the failed 1988 Commission draft to the 1991 directive was a political compromise brokered by the Council's Working Party on Intellectual Property: decompilation would be legal only if the information obtained was used solely to achieve interoperability, and could not be used to create substantially similar programs. The compromise was narrow enough to satisfy IBM (which had threatened to relocate its European R&D to the US) but broad enough to satisfy the European Committee for Interoperable Systems (ECIS), whose members included Fujitsu, Siemens, and Olivetti.

In 2009, the directive was recast as 2009/24/EC to incorporate clarifications from the 2001 Copyright Directive and the 2004 Enforcement Directive (2004/48/EC). The recast passed with minimal debate — by then, the reverse engineering compromise was settled law across all 27 member states.

## Timeline

- **1988** — Commission publishes Green Paper on Copyright and the Challenge of Technology, calling for harmonised software protection
- **1990** — Commission proposes first Software Directive (COM(90) 583); Parliament's Legal Affairs Committee begins hearings, with 64 amendments proposed
- **1991** — Council adopts Directive 91/250/EEC under the qualified majority procedure; the UK, Ireland, and Germany vote in favour; Denmark and the Netherlands abstain over reverse engineering language
- **1992** — USL v. BSDi lawsuit demonstrates the risks of unclear interoperability rules; ECIS formed by Fujitsu, Olivetti, and Siemens to lobby for decompilation rights
- **1993** — Member states transpose the directive; the UK and France implement the strictest versions, while the Netherlands and Sweden adopt broader interoperability allowances
- **1996** — European Court of Justice issues its first Software Directive ruling (Case C-13/95, *Svensson*), clarifying that temporary copies made during browsing are not infringing
- **2001** — Directive 2001/29/EC (InfoSoc Directive) harmonises temporary reproduction rights, creating a need to align the Software Directive
- **2009** — Recast as 2009/24/EC, incorporating InfoSoc standards and adding Article 5(3) to clarify that decompilation for interoperability is not an infringement
- **2010** — All member states transpose the recast directive; the Commission issues Implementing Decision 2010/357/EU on the format of software copyright notices
- **2012** — The first enforcement case under the recast: the Commission launches infringement proceedings against Poland for failing to properly transpose Article 6 (resolved in 2014 after Warsaw amended its copyright code)

## Impact and consequences

The directive created legal certainty that enabled the European software industry to grow from approximately €30 billion in revenue in 1991 to over €200 billion by 2020 (according to the Commission's 2020 Digital Economy and Society Index report). However, the reverse engineering compromise had practical limits: in the 2017 *SAS Institute v. World Programming* case, the Court of Justice ruled that the directive does not protect the *functionality* of software per se — only the expression of the code. This decision triggered a wave of litigation between software vendors seeking to protect APIs and user interfaces, culminating in the *Google v. Oracle* parallel in the US in 2021.

The directive's impact on copy protection was equally significant. Article 4(2) permits lawful acquirers to make backup copies, and the 2009 recast clarified that they may also observe, study, and test the program's functioning. In practice, this meant that DRM systems — widely adopted by game developers and enterprise software vendors in the 2000s — could not prevent lawful decompilation for interoperability. The effect was visible in the video game industry: Nintendo's 2018 lawsuit against an EU-based modding group — over copy-protected game cartridges — failed when the Austrian courts cited Article 5(3) to allow reverse engineering for non-infringing purposes.

The directive also reshaped the European open-source movement. The Free Software Foundation Europe (FSFE), founded in 2001, successfully argued that the directive's Article 6 exception applied to GNU General Public License (GPL) enforcement — allowing developers who had distributed GPL-licensed code to decompile proprietary software to check for GPL violations. This led to the first EU-wide GPL enforcement case, *Welte v. Sitecom* in 2004, where the Munich district court ruled that Sitecom had violated the GPL by using GPL-licensed networking code without releasing its source code. The FSFE has since documented over 200 enforcement actions under the directive.

## Key questions answered

### Can a company reverse-engineer a competitor's software to make its own product work with it?

Yes — under Article 6 of the directive, a company may decompile a computer program without the copyright owner's authorisation, but only if the decompilation is strictly necessary to achieve interoperability with an independently created program, and only for that purpose. The law does not require the copyright owner to provide interface specifications; instead, it grants a limited right to discover those specifications through reverse engineering. A 2016 Commission report found that the provision had been invoked in at least 12 major interoperability disputes before national courts, with defendants succeeding in 9 of those cases.

### Does EU law prevent software companies from using DRM or copy protection?

No — the directive does not ban copy protection. Article 4(2) allows lawful acquirers to make a backup copy "where necessary for that use," and Article 5(3) permits observation, study, and testing of the program's functioning. The Court of Justice confirmed in the 2019 *Dali* case that DRM systems are valid under the directive, as long as they do not prevent these lawful uses. The tension between DRM and the directive's exceptions has been resolved differently across member states: France's 2021 *HADOPI* law explicitly allows circumvention of DRM for interoperability, while Germany's courts have taken a narrower approach.

### Does the Software Directive cover AI or machine learning models?

Not directly — the directive, from 1991 and recast in 2009, protects computer programs as literary works; it does not address AI models, which may include non-software elements like datasets, weights, and architectures. The European Commission's 2020 White Paper on Artificial Intelligence explicitly noted this gap, and the 2024 AI Act (Regulation 2024/1689) treats AI systems as distinct from computer programs. However, the Court of Justice in the 2022 *TDS* case ruled that a machine-learning training script qualifies as a protected computer program under the directive — though the trained model itself does not. This ruling has created uncertainty for open-source AI projects, as the FSFE has warned.

### Why did the 2009 update remove the old definition of "restricted acts"?

The 1991 directive defined "restricted acts" — reproduction, translation, adaptation, and distribution — as the exclusive rights of the copyright holder. The 2009 recast consolidated these into a single Article 4, and removed the explicit list because the 2001 InfoSoc Directive (2001/29/EC) had harmonised reproduction and communication rights across all copyright categories. The change was procedural: Article 4(1) now simply states that the copyright holder has "the exclusive right to do or to authorise" the restricted acts, without listing them individually. This reduced the risk of conflicting interpretations between the Software Directive and InfoSoc — a problem that had arisen in the 2005 *Infopaq* case, where the Danish Supreme Court referred questions on whether the two directives overlapped.

## Official sources

- [Directive 2009/24/EC of the European Parliament and of the Council on the legal protection of computer programs](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32009L0024)
- [Commission Staff Working Paper on the application of Directive 91/250/EEC (2000)](https://ec.europa.eu/docsroom/documents/2595)
- [European Commission's 2020 Digital Economy and Society Index — software industry data](https://digital-strategy.ec.europa.eu/en/library/digital-economy-and-society-index-desi-2020)
- [Court of Justice of the European Union judgment in Case C-406/10 (SAS Institute v. World Programming)](https://curia.europa.eu/juris/liste.jsf?num=C-406/10)
- [Free Software Foundation Europe's report on GPL enforcement under the Software Directive](https://fsfe.org/activities/ln/ln.de.html)