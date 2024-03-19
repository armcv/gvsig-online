FROM geonode/geonode-base:latest-ubuntu-22.04

#INSTALLING DEPENDENCIES
RUN apt-get update
RUN apt install libxmlsec1 libxmlsec1-dev -y

COPY . GVSIGONLINE
WORKDIR GVSIGONLINE/gvsigol

RUN ln -s ../app_dev/gvsigol_app_dev
RUN ln -s ../plugin_edition/gvsigol_plugin_edition
RUN ln -s ../plugin_baseapi/gvsigol_plugin_baseapi
RUN ln -s ../plugin_featureapi/gvsigol_plugin_featureapi
RUN ln -s ../plugin_projectapi/gvsigol_plugin_projectapi
RUN ln -s ../plugin_geoetl/gvsigol_plugin_geoetl

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements-debian12.txt


ENTRYPOINT ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]
