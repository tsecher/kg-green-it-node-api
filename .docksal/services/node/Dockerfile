FROM node:18-slim

ARG HOST_UI

RUN bash -c "apt update -y && apt install git -y && apt clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp"

# Update host ui if defined in env.
RUN if [ -z "$HOST_UI" ]; then \
    echo "No user ui defined"; \
  else \
	echo "Update node ui ${HOST_UI}" && \
    usermod -u $HOST_UI node; \
  fi
