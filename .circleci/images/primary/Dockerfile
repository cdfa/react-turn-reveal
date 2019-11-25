FROM node:slim

RUN apt-get update && apt-get install -y --no-install-recommends \
	git \
	openssh-client \
	openssh-server \
	tar \
	gzip \
	ca-certificates

RUN curl -L https://unpkg.com/@pnpm/self-installer | node

# Cleanup
RUN rm -rf /var/lib/apt/lists/* && apt-get autoclean
