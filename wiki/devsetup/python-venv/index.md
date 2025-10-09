# Python 虚拟环境 | uv

## Python Version Control: uv

```sh
brew install uv
uv init myproject
uv add pandas
uv remove pandas
uv python list
uv python use 3.13
uv sync
uv run main.py # 会使用 .python-version 指定的版本运行
```

## Python venv

python自带的虚拟环境管理

在venv环境下，用pip安装的包都被安装到虚拟环境所在 path，具体目录是 path/lib/python3.x/site-packages，
系统Python环境不受任何影响

```bash
python3 -m venv path/to/dir
cd path/to/dir
source bin/activate
deactivate
python3 -m venv -h #for more info
```
