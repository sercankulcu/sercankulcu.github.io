---
title: 'About Semantic Web Technologies'
date: 2017-01-07
permalink: /posts/2017/01/about-semantic-web-technologies/
tags:
  - career
  - software
---

Tim Berners-Lee proposed the Semantic Web in a 2001 Scientific American article written with James Hendler and Ora Lassila. The vision was compelling: an extension of the existing web in which information would have explicit meaning, allowing software agents to reason across data from different sources, make connections automatically, and perform tasks that currently require human judgment to navigate.

Fifteen years later, the Semantic Web as originally envisioned has not arrived. But several of its technologies have become practically important in more specific contexts, and understanding the gap between the vision and the reality is itself instructive.

## The core technology stack

**RDF (Resource Description Framework)** is the foundational data model. Information is represented as triples: subject — predicate — object. Each element is identified by a URI or is a literal value.

```
<http://dbpedia.org/resource/Ankara> 
  <http://dbpedia.org/ontology/isCapitalOf> 
  <http://dbpedia.org/resource/Turkey>
```

This triple asserts a relationship between two identified resources using a named predicate. Unlike a relational database row, the triple is self-describing — the predicate is a dereferenceable URI that can carry its own definition.

**SPARQL** is the query language for RDF data. A query that asks for the capital of all EU member states:

```sparql
SELECT ?country ?capital WHERE {
  ?country rdf:type dbo:Country ;
           dbo:isCapitalOf ?capital ;
           dbo:isMemberOf dbr:European_Union .
}
```

This returns structured results from graph-shaped data, combining information from multiple subjects and predicates.

**OWL (Web Ontology Language)** allows specifying class hierarchies, property restrictions, and logical relationships. An OWL ontology can assert that "every person has exactly two biological parents" or "if A isPartOf B and B isPartOf C, then A isPartOf C" — reasoning that software can then apply automatically to data.

## Where it has worked

**DBpedia** extracts structured information from Wikipedia's infoboxes and publishes it as RDF. As of 2017, it covers approximately 4.58 million resources described with hundreds of millions of RDF triples. It is one of the most linked datasets in the Linked Open Data cloud and has been used as a knowledge base for question-answering systems.

**Schema.org** is the most practically successful outcome of Semantic Web thinking, though it operates differently from the original vision. It was launched in 2011 by Google, Microsoft, Yahoo, and Yandex as a shared vocabulary for structured markup. Web pages can include Schema.org annotations (in RDFa, Microdata, or JSON-LD format) that tell search engines what the page is about:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Giresun University",
  "url": "https://www.giresun.edu.tr"
}
</script>
```

Google uses these annotations to generate rich search results — event listings, product prices, recipe information — directly in search. This is Semantic Web technology succeeding because it produces immediate business value for the publishers and for Google.

**Knowledge graphs** at Google, Bing, and Wikidata use RDF-like structures to organize entities and relationships. Google's Knowledge Graph, which powers the information panels in search results, began largely from Freebase data and schema.org markup.

## Why the broader vision struggled

The original Semantic Web vision assumed that websites would add structured metadata describing what their content means — that publishers would annotate their data with ontologies and interoperable vocabularies. The incentive problem is that adding semantic markup takes effort, and the benefit accrues largely to the aggregators, not to the publisher.

RDF's flexibility also produced a proliferation of vocabularies. The same concept — "author of a document" — might be expressed using Dublin Core, FOAF, Schema.org, or a custom vocabulary. Data integration required reconciling these differences manually, which was expensive precisely at the scale where it mattered most.

JSON-LD, which can embed structured data inside regular JSON (familiar to web developers) rather than requiring separate RDF files, has substantially lowered the barrier to adoption. It is currently the recommended format for Schema.org markup and is supported by all major search engines. It represents a pragmatic convergence: the structured-data goal of the Semantic Web, achieved through a format that developers already understand.

The web does not have the universal machine-readable meaning layer that Berners-Lee imagined. It does have pockets of explicit structure where the value is clear and the implementation is practical. That narrower success has already changed what search engines can do.
