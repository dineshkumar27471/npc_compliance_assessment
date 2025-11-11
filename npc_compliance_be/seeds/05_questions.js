/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex("questions").del()

	// Inserts seed entries
	await knex("questions").insert([
		// Domain 1
		{
			question_text:
				"Has the Entity developed Data Quality Policy in alignment with Data Quality Policy Template provided in National Data Quality Management Guidelines?",
			requires_document: true,
			domain_id: 1,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity reviewed, approved, and published the Data Quality Policy following the defined process in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 1,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 2
		{
			question_text:
				"Has the Entity identified Critical Data Elements (CDEs) using the CDE Prioritization Framework Template, and conducted data profiling for identified CDEs using the Data Profiling Report Template as provided in the National Data Quality Management Guidelines?",
			requires_document: true,
			domain_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity developed and documented data quality rules and thresholds for Critical Data Elements (CDEs) in alignment with the Data Quality Rules Template as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 3
		{
			question_text:
				"Has the Entity selected a data quality tool in alignment with the Tool Selection Criteria Template, implemented the tool, and conducted data quality assessments in alignment with the Data Quality Assessment Template as provided in the National Data Quality Management Guidelines?",
			requires_document: true,
			domain_id: 3,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity enhanced its data quality monitoring and reporting capabilities to support automated data cleansing, API integrations, issue logging, and collaboration among data stewards?",
			requires_document: false,
			domain_id: 3,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 4
		{
			question_text:
				"Has the Entity implemented AI-powered data quality management features such as AIML-driven rule generation?",
			requires_document: true,
			domain_id: 4,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity identified, documented, and actively remediated data quality issues in alignment with the Data Quality Issues Management Register Template and Data Quality Remediation Plan Template as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 4,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 5
		{
			question_text:
				"Has the Entity defined and documented Data Quality KPIs to measure data quality levels and trends?",
			requires_document: true,
			domain_id: 5,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity implemented Data Quality Monitoring & Reporting mechanisms to track the entity's data quality performance in alignment with the Data Quality scorecard and dashboard templates as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 5,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 6
		{
			question_text:
				"Has the Entity enhanced its data quality monitoring and reporting capabilities?",
			requires_document: true,
			domain_id: 6,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity established and documented Data Quality SLAs in alignment with the Data Quality SLAs template as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 6,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 7
		{
			question_text:
				"Has the Entity implemented an automated system to monitor SLA compliance and trigger notifications when SLAs are breached?",
			requires_document: true,
			domain_id: 7,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity established and documented Data Quality SLAs in alignment with the Data Quality SLAs template as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 7,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 8
		{
			question_text:
				"Has the Entity developed Data Quality Policy in alignment with Data Quality Policy Template provided in National Data Quality Management Guidelines?",
			requires_document: true,
			domain_id: 8,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity reviewed, approved, and published the Data Quality Policy following the defined process in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 8,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 9
		{
			question_text:
				"Has the Entity identified Critical Data Elements (CDEs) using the CDE Prioritization Framework Template, and conducted data profiling for identified CDEs using the Data Profiling Report Template as provided in the National Data Quality Management Guidelines?",
			requires_document: true,
			domain_id: 9,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity developed and documented data quality rules and thresholds for Critical Data Elements (CDEs) in alignment with the Data Quality Rules Template as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 9,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 10
		{
			question_text:
				"Has the Entity selected a data quality tool in alignment with the Tool Selection Criteria Template, implemented the tool, and conducted data quality assessments in alignment with the Data Quality Assessment Template as provided in the National Data Quality Management Guidelines?",
			requires_document: true,
			domain_id: 10,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity enhanced its data quality monitoring and reporting capabilities to support automated data cleansing, API integrations, issue logging, and collaboration among data stewards?",
			requires_document: false,
			domain_id: 10,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 11
		{
			question_text:
				"Has the Entity implemented AI-powered data quality management features such as AIML-driven rule generation?",
			requires_document: true,
			domain_id: 11,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity identified, documented, and actively remediated data quality issues in alignment with the Data Quality Issues Management Register Template and Data Quality Remediation Plan Template as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 11,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 12
		{
			question_text:
				"Has the Entity defined and documented Data Quality KPIs to measure data quality levels and trends?",
			requires_document: true,
			domain_id: 12,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity implemented Data Quality Monitoring & Reporting mechanisms to track the entity's data quality performance in alignment with the Data Quality scorecard and dashboard templates as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 12,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 13
		{
			question_text:
				"Has the Entity enhanced its data quality monitoring and reporting capabilities?",
			requires_document: true,
			domain_id: 13,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity established and documented Data Quality SLAs in alignment with the Data Quality SLAs template as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 13,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 14
		{
			question_text:
				"Has the Entity implemented an automated system to monitor SLA compliance and trigger notifications when SLAs are breached?",
			requires_document: true,
			domain_id: 14,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity established and documented Data Quality SLAs in alignment with the Data Quality SLAs template as provided in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 14,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},

		// Domain 15
		{
			question_text:
				"Has the Entity developed Data Quality Policy in alignment with Data Quality Policy Template provided in National Data Quality Management Guidelines?",
			requires_document: true,
			domain_id: 15,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			question_text:
				"Has the Entity reviewed, approved, and published the Data Quality Policy following the defined process in the National Data Quality Management Guidelines?",
			requires_document: false,
			domain_id: 15,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	])
}
