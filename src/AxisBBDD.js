export const po = [
	"Product Management",
	"Customer & Stakeholder Management	",
	"Product Delivery",
	"Relationship with the team",
];

export const sm = [
	"Developing Teams",
	"Adoption of agile",
	"Enabling Continuous Improvement",
	"Enabling Transparency",
];

export const rte = [
	"Product Managment",
	"Scaling Agile",
	"Product Delivery",
	"Relationship with Tribe",
];

export const tl = [
	"Product Management",
	"Customer and Stakeholders Management",
	"Product Delivery",
	"Relationship with Tribe",
];

export const ttl = [
	"Engineering consistency, standards and best practices",
	"Product Delivery",
	"Relationship with Tribe",
];

export const pm = [
	"Product Management",
	"Product Delivery",
	"Optimizing Strategy and Budgeting",
	"Organizational Leadership",
];

export const cl = [
	"Developing People",
	"Defining Standards and Quality",
	"Relationship with Chapter Members",
];

export const selectOptions = [
	{ value: "cl", description: "CL: Chapter Lead" },
	{ value: "pm", description: "PM: Product Manager" },
	{ value: "po", description: "PO: Product Owner" },
	{ value: "rte", description: "RTE: Release Train Engineer" },
	{ value: "sm", description: "SM: Scrum Master" },
	{ value: "tl", description: "TL: Tribe Lead" },
	{ value: "ttl", description: "TTL: Tribe Technology Lead" },
];

import { axisStore } from "./stores/axisStore.js";

export let tag;

axisStore.subscribe((storeName) => {
	console.log("funciona");

	switch (storeName) {
		case "cl":
			tag = cl;
			break;
		case "pm":
			tag = pm;
			break;

		case "po":
			tag = po;
			break;
		case "rte":
			tag = rte;
			break;

		case "sm":
			tag = sm;
			break;

		case "tl":
			tag = tl;
			break;

		case "ttl":
			tag = ttl;
			break;

		default:
			tag = "cl";
	}
});
