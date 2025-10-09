MSG := "TIME:"
MSG += $(shell date)
		
all:
	@if git add --all && git commit -m "$(MSG)"; then \
		git push && echo "\033[32mSuccess!\033[0m"; \
	else \
		echo "\033[31mNothing changed\033[0m";\
	fi

