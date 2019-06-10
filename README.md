# richaudeau.js
**A** Javascript file for a better reading experience


**T**he `richaudeau` script modify text according to Richaudeau's advises to enhance the readability of a text:

- **E**ach sentence starts with a bold character,
- **A**n unbreakable space is added between two sentences.

**T**he goal is to help the reader to scan a text for information. &nbsp;**B**y visually splitting the sentences, this script makes them easier to find and read.

**F**or more details, see RICHAUDEAU (François), _Des neurones et des pixels_, Atelier Perrousseaux Éditeur, 1999, page 139.

## Usage

**J**ust add this HTML snippet anywhere in the HTML page, for example at the end of the page.

`<script src="richaudeau.js"></script>`

## Issues

**T**his script does not take in account the page language. &nbsp;**I**t can produce unexpected results with arabic or chinese texts, for example.
