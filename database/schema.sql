set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Users" (
  "userId"        serial      NOT NULL,
  "username"      TEXT        NOT NULL UNIQUE,
  "hashPassword"  TEXT        NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "Users_pk" PRIMARY KEY ("userId"),
  UNIQUE ("username")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."Cats" (
  "catId"     serial      NOT NULL,
  "name"      TEXT        NOT NULL,
  "gender"    TEXT        NOT NULL,
  "age"       TEXT        NOT NULL,
  "userId"    integer     NOT NULL,
  "photoUrl"  TEXT        NOT NULL,
  "breed"     TEXT        NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "Cats_pk" PRIMARY KEY ("catId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."Whiskers" (
  "entryId"   serial      NOT NULL,
  "name"      TEXT        NOT NULL,
  "catId"     integer     NOT NULL,
  "photoUrl"  TEXT,
  "note"      TEXT        NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "Whiskers_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "Cats" ADD CONSTRAINT "Cats_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "Whiskers" ADD CONSTRAINT "Whiskers_fk0" FOREIGN KEY ("catId") REFERENCES "Cats"("catId");
