import { axisStore } from "./stores/axisStore.js";

const axisTags = [
	{
		value: "cl",
		description: "CL: Chapter Lead",
		tags: [
			"Developing People",
			"Defining Standards and Quality",
			"Relationship with Chapter Members",
		],
	},
	{
		value: "DevOps",
		description: "DevOps Engineer",
		tags: [
			"DevOps Tools and Culture Adoption",
			"Software Development Life Cycle Automation",
			"Strategize the Entire Integration and Deployment Process",
		],
	},
	{
		value: "pm",
		description: "PM: Product Manager",
		tags: [
			"Product Management",
			"Product Delivery",
			"Optimizing Strategy and Budgeting",
			"Organizational Leadership",
		],
	},
	{
		value: "po",
		description: "PO: Product Owner",
		tags: [
			"Product Management",
			"Customer & Stakeholder Management",
			"Product Delivery",
			"Relationship with the team",
		],
	},
	{
		value: "rte",
		description: "RTE: Release Train Engineer",
		tags: [
			"Product Managment",
			"Scaling Agile",
			"Product Delivery",
			"Relationship with Tribe",
		],
	},
	{
		value: "sa",
		description: "SA: Solution Architect",
		tags: [
			"Define Organization-wide Software Architecture",
			"Ensure Standards and Policies",
			"Strategize the Entire Integration of Solutions",
		],
	},

	{
		value: "se",
		description: "SE: Software Engineer",
		tags: [
			"Clean and Efficient Technical Solutions",
			"Product Quality Assurance",
			"Integration of Solutions",
			"Cross-functional Collaboration",
		],
	},
	{
		value: "sm",
		description: "SM: Scrum Master",
		tags: [
			"Developing Teams",
			"Adoption of agile",
			"Enabling Continuous Improvement",
			"Enabling Transparency",
		],
	},
	{
		value: "te",
		description: "TE: Testing Engineer",
		tags: [
			"QA Strategy",
			"Test Automatization",
			"Agile Product testing & Tracking",
		],
	},
	{
		value: "tl",
		description: "TL: Tribe Lead",
		tags: [
			"Product Management",
			"Customer and Stakeholders Management",
			"Product Delivery",
			"Relationship with Tribe",
		],
	},
	{
		value: "ttl",
		description: "TTL: Tribe Technology Lead",
		tags: [
			"Engineering consistency, standards and best practices",
			"Product Delivery",
			"Relationship with Tribe",
		],
	},
];

// options in modal to select axis

export const selectOptions = [];

let axisTagsSelectOptions = axisTags.map((obj) =>
	selectOptions.push({ value: obj.value, description: obj.description })
);

// tags to axis (used in score calculation (cardUnit & moderator) and vertical chart

export let tag = [0];

axisStore.subscribe((axisSelected) => {
	let axisTagsFiltered = axisTags.filter((obj) => obj.value == axisSelected);
	tag = axisTagsFiltered[0].tags;
});
