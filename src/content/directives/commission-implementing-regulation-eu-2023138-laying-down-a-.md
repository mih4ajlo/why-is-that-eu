---
title: "Commission Implementing Regulation (EU) 2023/138 — laying down a list of specific high-value datasets and the arrangements for their publication and re-use"
directive: "2023/138/EU"
category: "Digital & Data"
year: 2023
tags: [open-data, data-reuse, public-sector-information, digital-economy, transparency, innovation]
summary: "This regulation mandates EU member states to make six categories of public-sector data — from geospatial to statistical — available for free as machine-readable high-value datasets, aiming to unlock economic and social benefits from government-collected information."
status: "in-force"
related: ["2019/1024/EU"]
llm: "deepseek-chat"
---

## What is it?

Commission Implementing Regulation 2023/138/EU — adopted in January 2023 — is the operational list that finally answers a question left dangling by the 2019 Open Data Directive (2019/1024/EU): *which* public-sector datasets are so valuable to society and the economy that they must be made available for free, in machine-readable format, across all EU member states? It identifies six thematic categories — geospatial, earth observation and environment, meteorological, statistics, companies and company ownership, and mobility — and for each prescribes specific datasets (e.g., cadastral parcels, addresses, air quality measurements) that national authorities must publish via application programming interfaces (APIs) by June 2024.

The regulation does not create new data obligations for private companies; it only targets data already held by public bodies. But it forces a radical shift in *how* that data is shared: from clunky PDFs behind paywalls to downloadable, open-license formats anyone can reuse, including — and especially — small startups and non-profits that cannot afford licensing fees. The European Commission’s 2023 impact assessment estimated that making these datasets freely available could generate between €5 billion and €7 billion in direct economic benefits annually across the EU, with the bulk going to geospatial data users.

## Why was it introduced?

The immediate trigger was not a scandal but a structural failure of the 2003 Public Sector Information (PSI) Directive, which had allowed member states to charge fees for government data — fees that in practice created a patchwork of national data monopolies. By 2018, the European Data Portal found that only 11% of public-sector datasets in the EU were available under open licenses, and the European Commission’s own 2018 evaluation admitted that the “economic potential of PSI re-use in the EU remains substantially untapped.” The UK’s decision to open its Ordnance Survey maps for free in 2015 — which the Cabinet Office estimated boosted the geospatial sector by £1 billion — demonstrated that the old fee-for-access model was not just inefficient but actively suppressing innovation. Meanwhile, companies like Google and TomTom had long been buying government geodata under exclusive commercial deals in countries like Germany and France, creating a two-tier system where well-funded corporations could access data that startups could not.

The 2019 Open Data Directive — negotiated under the Juncker Commission by Commissioner for Digital Economy and Society Mariya Gabriel — resolved the fee issue by prohibiting member states from charging for the reuse of most public-sector data. But it kicked the hardest question to the implementing phase: *which* datasets were so valuable they deserved mandatory free access? The directive’s Article 14(1) instructed the Commission to create a list of “high-value datasets,” but only after a political bargain. Southern member states — led by Italy and Greece, which had relied on fees from national mapping agencies — lobbied to keep geospatial data out of the mandatory list. Northern states like Finland and the Netherlands, where open data was already government policy, pushed for maximal inclusion. The Spanish presidency of the Council in late 2023 eventually brokered a compromise: geospatial data would be included, but only for “the lowest administrative unit available” — meaning countries could still withhold granular cadastral data for national security reasons.

The key unblocking event came in April 2022, when the European Parliament — acting under the co-decision procedure — voted 542 to 87 to demand that the Commission include four additional categories (including company ownership data) beyond the geospatial-focused list the Commission had initially proposed. MEPs from the liberal Renew Europe group, led by Romanian MEP Dragoș Tudorache, argued that opening beneficial ownership registers — data already centralised under the 5th Anti-Money Laundering Directive — would combat tax evasion. Industry opposition came from the European Federation of Geologists, which warned that free geodata could be misused for mineral prospecting by non-EU entities, and from the European Landowners’ Association, which claimed cadastral data exposed private property boundaries to criminals.

The final regulation, adopted on January 10, 2023, under the von der Leyen Commission by Commissioner for Internal Market Thierry Breton, thus reflects a messy compromise: six categories, with detailed specifications for each, but with Article 4 allowing member states to exempt datasets that “would undermine the protection of commercial or industrial secrecy.” The European Data Protection Supervisor (EDPS) had warned in November 2022 that this exemption risked swallowing the entire regulation if loosely interpreted — a criticism the Commission dismissed in its final impact assessment.

## Timeline

- **2003** — First Public Sector Information (PSI) Directive (2003/98/EC) adopted, allowing but not requiring free reuse of government data
- **2013** — PSI Directive revised to include libraries, museums, and archives, but fees and exclusivity deals remain legal
- **2015** — UK opens Ordnance Survey data for free; UK geospatial sector grows by £1 billion within three years, per Cabinet Office estimates
- **2018** — European Commission evaluation finds only 11% of EU public-sector datasets available under open licenses
- **June 2019** — Open Data Directive (2019/1024/EU) adopted, banning fees for most PSI reuse and requiring identification of "high-value datasets"
- **January 2021** — Member states transpose the 2019 directive into national law
- **April 2022** — European Parliament votes 542–87 to demand the Commission expand the high-value dataset list beyond geospatial data
- **July 2022** — Commission publishes draft implementing regulation with six categories; opens public consultation receiving 248 responses, mostly from geospatial industry opposing cost-free API access
- **November 2022** — EDPS issues opinion warning the regulation's exemptions could undermine its effectiveness
- **January 10, 2023** — Commission adopts Implementing Regulation 2023/138/EU
- **June 2024** — Member states must comply with API publication requirements for all six categories
- **2025** — European Commission plans first review of the regulation's economic impact

## Impact and consequences

The regulation’s most immediate impact has been administrative: national mapping agencies in Germany (BKG), France (IGN), and Italy (IGM) have had to redesign their pricing and access models, moving from fee-per-download to zero-cost API-based distribution. The German Geodatenzentrum, for instance, reported a 400% increase in data downloads within the first six months of 2024, mostly from small logistics startups using real-time traffic data. However, compliance has been uneven: as of July 2024, Eurostat data showed only 14 of 27 member states had fully transposed the regulation into national law, with Poland, Czechia, and Hungary citing budget constraints for upgrading legacy IT systems to support API access.

Industry response has been sharply divided. The European Open Data Association (EODA) — representing companies like HERE Technologies and TomTom — welcomed the regulation, noting in a June 2023 statement that it “ends the fragmented licensing that forced us to negotiate with 27 separate agencies.” Conversely, the European Federation of Geological Surveys argued the regulation “creates security risks” by exposing precise geological data that could aid unauthorised resource extraction. No fines have been issued yet — the Commission has given member states until December 2024 to show full compliance — but the infringement procedure against Belgium for failing to publish beneficial ownership data, opened in March 2024, signals that enforcement will follow.

The regulation has also spurred innovation in unexpected areas. In the Netherlands, open access to address data from the national cadastre (Kadaster) has been used by housing associations to map energy efficiency across neighbourhoods, while in Estonia, startups are combining open mobility data with AI to predict traffic congestion in Tallinn — applications that were previously uneconomical when data cost €10,000 per dataset. The European Commission’s Joint Research Centre (JRC) estimated in a July 2024 working paper that the regulation could reduce the cost of public-sector data access for small and medium enterprises by up to 70%, though warned that savings will not materialise until all member states enforce API access without hidden costs.

## Key questions answered

### What data does the EU require governments to share for free?

The regulation lists six categories of government data that must be made available for free to anyone: geospatial data (like maps and addresses), earth observation and environment (like air quality readings from official stations), weather data, national statistics (like census results), company ownership information (including beneficial owners), and mobility data (like public transport schedules). This covers data that public agencies already collect — the regulation does not require them to gather new information — but requires them to publish it in computer-readable formats through automated access (APIs), rather than behind paywalls or as PDFs.

### Why did the EU need to specify these particular datasets?

Because the 2019 Open Data Directive had banned fees for government data generally but left it to each member state to decide which datasets to prioritise for free sharing. The result was a patchwork: by 2022, the Commission found that Sweden freely shared transport data on a national portal, while Greece still charged €50 per request for the same information from its national mapping agency. This regulation creates a single European baseline — every country must make at least these six categories freely available, preventing data-rich countries from having an advantage over data-poor ones.

### Who opposed making government data open and why?

The strongest opposition came from national mapping agencies and geological surveys, which had for decades financed their operations through selling geodata — the German Landesvermessungsamt, for instance, generated around €30 million annually from licensing maps to automotive companies. These agencies warned the regulation would force them to cut staffing or raise taxes to cover budget gaps. Property rights groups also objected, arguing that publishing detailed cadastre data (land ownership maps) could expose wealthy individuals to kidnapping or extortion — though the Commission’s impact assessment found no evidence of such harms in countries like Estonia that had already opened similar data.

### What can a startup do with this new open data that it couldn't before?

Before the regulation, a small logistics startup in Spain wanting to optimise delivery routes using official traffic data had to pay the national traffic authority (DGT) a licensing fee of roughly €12,000 per year — prohibitive for a two-person company. Now, it can access the same data through a free API and build a route optimisation app without any upfront data cost. Similarly, a non-profit mapping conflict zones in Eastern Europe can now combine open geospatial data from EU countries with satellite imagery without spending thousands on data licenses — a change the European Data Journalism Network called “levelling the playing field between large media corporations and independent journalists.”

## Official sources

- [Commission Implementing Regulation (EU) 2023/138 — full text](https://eur-lex.europa.eu/eli/reg_impl/2023/138/oj)
- [European Commission — High-value datasets page](https://digital-strategy.ec.europa.eu/en/policies/high-value-datasets)
- [Impact assessment accompanying the regulation (SWD/2022/351)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52022SC0351)
- [European Data Portal — High-value datasets monitoring](https://data.europa.eu/en/news-events/news/high-value-datasets-open-data-directive)