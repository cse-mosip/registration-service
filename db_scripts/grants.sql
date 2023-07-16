GRANT CONNECT
   ON DATABASE mosip_registrationrepo
   TO registrationrepouser;

GRANT USAGE
   ON SCHEMA registrationrepo
   TO registrationrepouser;

GRANT SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES
   ON ALL TABLES IN SCHEMA registrationrepo
   TO registrationrepouser;

ALTER DEFAULT PRIVILEGES IN SCHEMA registrationrepo
	GRANT SELECT,INSERT,UPDATE,DELETE,REFERENCES ON TABLES TO registrationrepouser;