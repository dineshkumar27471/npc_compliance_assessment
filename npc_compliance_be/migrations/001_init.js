export async function up(knex) {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

  // roles
  await knex.schema.createTable("roles", table => {
    table.increments("id").primary();
    table.string("name").unique().notNullable();  
    table.timestamps(true, true);
  });

  // entities
  await knex.schema.createTable("entities", table => {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
    table.string("name");
    table.text("description");
    table.timestamps(true, true);
  });

  // users
  await knex.schema.createTable("users", table => {
    table.uuid("id").primary();
    table.string("name");
    table.string("email").unique();
    table.string("password_hash");
    table.timestamps(true, true);
    table.integer("role_id").references("id").inTable("roles").onDelete("SET NULL");
    table.uuid("entity_id").references("id").inTable("entities").onDelete("SET NULL");
  });

  // assessment types
  await knex.schema.createTable("assessment_types", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });

  // entity assessments
  await knex.schema.createTable("entity_assessments", table => {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.string("status").defaultTo("assigned");
    table.uuid("submitted_by");
    table.uuid("reviewed_by");
    table.integer("year");
    table.text("comments");
    table.timestamps(true, true);
    table.uuid("entity_id").references("id").inTable("entities").onDelete("SET NULL");
    table.integer("assessment_type_id").references("id").inTable("assessment_types").onDelete("SET NULL");
  });

  // domains
  await knex.schema.createTable("domains", table => {
    table.increments("id").primary();
    table.string("name");
    table.text("description");
    table.integer("order_index");
    table.timestamps(true, true);
    table.integer("assessment_type_id").references("id").inTable("assessment_types").onDelete("SET NULL");
  });

  // questions
  await knex.schema.createTable("questions", table => {
    table.increments("id").primary();
    table.text("question_text");
    table.boolean("requires_document").defaultTo(false);
    table.integer("order_index");
    table.timestamps(true, true);
    table.integer("domain_id").references("id").inTable("domains").onDelete("SET NULL");
  });

  // assessment domain scores
  await knex.schema.createTable("assessment_domain_scores", table => {
    table.increments("id").primary();
    table.integer("domain_id").references("id").inTable("domains").onDelete("SET NULL");
    table.decimal("score");
    table.uuid("entity_assessment_id").references("id").inTable("entity_assessments").onDelete("SET NULL");
    table.timestamps(true, true);
  });

  // answers
  await knex.schema.createTable("answers", table => {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.string("answer_value");
    table.text("comment");
    table.text("question_text_snapshot");
    table.timestamps(true, true);
    table.uuid("entity_assessment_id").references("id").inTable("entity_assessments").onDelete("SET NULL");
    table.integer("question_id").references("id").inTable("questions").onDelete("SET NULL");
    table.unique(["entity_assessment_id", "question_id"]);
  });

  // assessment answers (your older version style)
  await knex.schema.createTable("assessment_answers", table => {
    table.increments("id").primary();
    table.integer("question_id").references("id").inTable("questions");
    table.string("answer");
    table.text("plan_text");
    table.timestamps(true, true);
  });

  // documents
  await knex.schema.createTable("documents", table => {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.text("file_path");
    table.text("description");
    table.uuid("uploaded_by");
    table.timestamps(true, true);
    table.uuid("entity_assessment_id").references("id").inTable("entity_assessments").onDelete("SET NULL");
  });

  // document questions
  await knex.schema.createTable("document_questions", table => {
    table.increments("id").primary();
    table.uuid("document_id").references("id").inTable("documents").onDelete("CASCADE");
    table.integer("question_id").references("id").inTable("questions").onDelete("CASCADE");
    table.unique(["document_id", "question_id"]);
  });

  // document question mapping
  await knex.schema.createTable("document_question_mapping", table => {
    table.increments("id").primary();
    table.integer("question_id").notNullable().references("id").inTable("questions").onDelete("CASCADE");
    table.uuid("document_id").references("id").inTable("documents").onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // review logs
  await knex.schema.createTable("review_logs", table => {
    table.increments("id").primary();
    table.uuid("reviewed_by");
    table.string("status");
    table.text("comments");
    table.timestamps(true, true);
    table.uuid("entity_assessment_id").references("id").inTable("entity_assessments").onDelete("SET NULL");
  });
}

export async function down(knex) {
  await knex.schema
    .dropTableIfExists("review_logs")
    .dropTableIfExists("document_question_mapping")
    .dropTableIfExists("document_questions")
    .dropTableIfExists("documents")
    .dropTableIfExists("assessment_answers")
    .dropTableIfExists("answers")
    .dropTableIfExists("assessment_domain_scores")
    .dropTableIfExists("questions")
    .dropTableIfExists("domains")
    .dropTableIfExists("entity_assessments")
    .dropTableIfExists("users")
    .dropTableIfExists("entities")
    .dropTableIfExists("assessment_types")
    .dropTableIfExists("roles");
}
  

export async function up(knex) {
  await knex.schema.alterTable("questions", (table) => {
    table.boolean("is_ans").defaultTo(true);
    table.text("idmc_api_url").nullable();
    table.text("default_answer").nullable();
  });
}

export async function down(knex) {
  await knex.schema.alterTable("questions", (table) => {
    table.dropColumn("is_ans");
    table.dropColumn("idmc_api_url");
    table.dropColumn("default_answer");
  });
}
await knex.schema.alterTable("questions", (table) => {
  table.boolean("is_ans").defaultTo(true);
  table.text("idmc_api_url").nullable();
  table.text("default_answer").nullable();
});
