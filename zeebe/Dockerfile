# The image from Docker Hub
FROM camunda/zeebe:0.24.1
RUN apt-get -y update && apt-get install -y wget

ARG ZEEBE_HAZELCAST_EXPORTER_VERSION=0.9.0
ARG ZEEBE_HAZELCAST_EXPORTER_URI=https://github.com/zeebe-io/zeebe-hazelcast-exporter/releases/download/$ZEEBE_HAZELCAST_EXPORTER_VERSION/zeebe-hazelcast-exporter-$ZEEBE_HAZELCAST_EXPORTER_VERSION-jar-with-dependencies.jar
ARG ZEEBE_HAZELCAST_EXPORTER_DIR=/usr/local/zeebe/exporters
ARG ZEEBE_HAZELCAST_EXPORTER_FILENAME=$ZEEBE_HAZELCAST_EXPORTER_DIR/zeebe-hazelcast-exporter.jar

RUN mkdir -p $ZEEBE_HAZELCAST_EXPORTER_DIR \
  && wget -qO $ZEEBE_HAZELCAST_EXPORTER_FILENAME $ZEEBE_HAZELCAST_EXPORTER_URI

# https://github.com/zeebe-io/zeebe-hazelcast-exporter/tree/0.8.0#manual
ENV ZEEBE_BROKER_EXPORTERS_HAZELCAST_JARPATH=$ZEEBE_HAZELCAST_EXPORTER_FILENAME
ENV ZEEBE_BROKER_EXPORTERS_HAZELCAST_CLASSNAME="io.zeebe.hazelcast.exporter.HazelcastExporter"
ENV ZEEBE_BROKER_EXPORTERS_HAZELCAST_ARGS_PORT=5701
