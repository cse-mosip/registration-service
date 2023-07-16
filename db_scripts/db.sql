CREATE DATABASE registrationrepo
    WITH
    OWNER = azureuser
    TEMPLATE = template0
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    IS_TEMPLATE = True;

COMMENT ON DATABASE registrationrepo
    IS 'REGISTRATIONREPO will have the data of students who have registered';

\c mosip_registrationrepo

DROP SCHEMA IF EXISTS registrationrepo CASCADE;
CREATE SCHEMA registrationrepo;
ALTER SCHEMA registrationrepo OWNER TO azureuser;
ALTER DATABASE mosip_registrationrepo SET search_path TO registrationrepo,pg_catalog,public;