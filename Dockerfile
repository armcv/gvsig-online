FROM geonode/geonode-base:latest-ubuntu-22.04
#INSTALLING DEPENDENCIES
RUN apt-get update
RUN apt install libxmlsec1 libxmlsec1-dev -y
# RUN apt-get install -y python-dev libxml2 libxml2-dev libxslt-dev git python3-pip libpq-dev libsasl2-dev libldap2-dev libssl-dev libxml2-dev libxmlsec1-dev libxmlsec1-openssl pkg-config gdal-bin gdal-data libgdal-dev libgdal-perl libgdal-perl-doc libgdal28 python3-gdal default-jre
ADD ./gvsig-online GVSIGONLINE
WORKDIR GVSIGONLINE/gvsigol
RUN ln -s ../app_dev/gvsigol_app_dev
RUN ln -s ../plugin_edition/gvsigol_plugin_edition
RUN ln -s ../plugin_baseapi/gvsigol_plugin_baseapi
RUN ln -s ../plugin_featureapi/gvsigol_plugin_featureapi
RUN ln -s ../plugin_projectapi/gvsigol_plugin_projectapi
RUN ln -s ../plugin_geoetl/gvsigol_plugin_geoetl
RUN ln -s ../plugin_print/gvsigol_plugin_print

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements-debian12.txt
# RUN apt-get install -y wget curl gnupg2 software-properties-common apt-transport-https
# RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc |  apt-key add -
# RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | tee  /etc/apt/sources.list.d/pgdg.list
# #postgres
# RUN apt -y install gnupg2 wget vim
# RUN mkdir -pv /opt/gvsigol_data/data/images
ENTRYPOINT ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]