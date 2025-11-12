# latex VSCode 配置

## MacOS配置latex 环境

```sh
brew install mactex-no-gui
pdflatex xxx.tex
xelatex xxx.tex
```

## VSCode 配置

Plugin: LaTeX Workshop

```json
"latex-workshop.latex.tools": [
        {
                "name": "pdflatex",
                "command": "pdflatex",
                "args": [
                        "-synctex=1",
                        "-interaction=nonstopmode",
                        "-file-line-error",
                        "%DOC%"
                ]
        },
        {
                "name": "xelatex",
                "command": "xelatex",
                "args": [
                        "-synctex=1",
                        "-interaction=nonstopmode",
                        "-file-line-error",
                        "%DOC%"
                ]
        },
        {
                "name": "bibtex",
                "command": "bibtex",
                "args": [
                        "%DOCFILE%"
                ]
        }

],
"latex-workshop.latex.build.forceRecipeUsage": false,
"latex-workshop.view.pdf.viewer": "external",
"latex-workshop.synctex.afterBuild.enabled": true,

"latex-workshop.view.pdf.viewer": "external",
"latex-workshop.view.pdf.external.viewer.command": "open",
      "latex-workshop.view.pdf.external.viewer.args": [
        "-a",
        "preview",
        "%PDF%"
      ],
"latex-workshop.view.pdf.external.synctex.command": "open",
"latex-workshop.view.pdf.external.synctex.args": [
    "-g",
    "-a",
    "preview",
    "%PDF%",
],
```
