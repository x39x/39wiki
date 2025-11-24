# vim 笔记

[Cheatsheet](https://github.com/skywind3000/awesome-cheatsheets)

## 执行外部命令

- `:!cmd`执行命令行命令把他的stdout指向vim的消息窗口
- `:r !cmd`同样的，只是把输出pipe到你cursor的下一行
- `:w !cmd`把本buffer内容pipe到这个命令的stdin
- `:.!cmd` 把当前行pipe给cmd，再把cmd的stdout输出读回来替换掉当前行
- `:%!cmd` 同上，但是当前buffer,再把cmd的stdout输出读回来替换掉当前buffer
- `:'<'>!cmd`,同上，但是选取区域,再把cmd的stdout输出读回来替换掉所选区域

## Tips

- `Ctrl w o` ：关闭其他所以窗口
- `cc` 清空一行并在合适的缩进位置进入插入模式
- `C-g` show current buffer path

- 10% 移动到文件 10% 处
- 在空白行使用 dip 命令可以删除所有临近的空白行，viw 可以选择连续空白
- 缩进时使用 `>8j >} <ap >ap =i} ==`会方便很多
- 插入模式下，当你发现一个单词写错了，应该多用 CTRL-W 这比 `<BackSpace>` 快
- c d x 命令会自动填充寄存器 "1 到 "9 , y 命令会自动填充 "0 寄存器
- 用 v 命令选择文本时，可以用 o 掉头选择，有时很有用
- 写文章时，可以写一段代码块，然后选中后执行 :!python 代码块就会被替换成结果
- 搜索后经常使用 :nohl 来消除高亮，使用很频繁，可以 map 到 `<BackSpace>` 上
- 搜索时可以用 CTRL-R CTRL-W 插入光标下的单词，命令模式也能这么用
- 映射按键时，应该默认使用 noremap ，只有特别需要的时候使用 map
- 当你觉得做某事很低效时，你应该停下来，u u u u 然后思考正确的高效方式来完成
- 用 y复制文本后，命令模式中 CTRL-R 然后按双引号 0 可以插入之前复制内容
- 某些情况下 Vim 绘制高亮慢，滚屏刷新慢可以试试 set re=1 使用老的正则引擎
- Windows 下的 GVim 可以设置 set rop=type:directx,renmode:5 增强显示

## vim 配置文件加载规则

nvim plugin 、ftplugin、queries是用来覆盖[内置runtime目录](https://github.com/neovim/neovim/blob/master/runtime)
的，after/plugin 、after/plugin... 是追加

## 插件

### 文件浏览

https://github.com/simonmclean/triptych.nvim
类似Ranger

```lua
require("triptych").setup({
        options = {
                backdrop = 100,
        },
})
```

https://github.com/stevearc/oil.nvim,

```lua
require("oil").setup({
        default_file_explorer = false,
        delete_to_trash = true,
        skip_confirm_for_simple_edits = true,
        watch_for_changes = true,
        use_default_keymaps = false,
        keymaps = {
                ["g?"] = { "actions.show_help", mode = "n" },
                ["L"] = "actions.select",
                ["H"] = { "actions.parent", mode = "n" },
                ["q"] = { "actions.close", mode = "n" },
                [","] = { "actions.open_cwd", mode = "n" },
                ["`"] = { "actions.cd", mode = "n" },
                ["~"] = { "actions.cd", opts = { scope = "tab" }, mode = "n" },
                ["="] = "actions.open_external",
                ["gs"] = { "actions.change_sort", mode = "n" },
                ["g."] = { "actions.toggle_hidden", mode = "n" },
                ["<C-p>"] = { "actions.preview", mode = "n" },
                ["<C-R>"] = { "actions.refresh", mode = "n" },
                ["<C-v>"] = { "actions.select", opts = { vertical = true } },
                ["<C-s>"] = { "actions.select", opts = { horizontal = true } },
                ["<C-t>"] = { "actions.select", opts = { tab = true } },
        },
        view_options = {
                show_hidden = true,
        },
        float = {
                padding = 0,
                border = "single",
                get_win_title = nil,
                preview_split = "auto",
                override = function(conf)
                        local ui = vim.api.nvim_list_uis()[1]
                        local sidebar_width = math.floor(ui.width * 0.17)

                        -- send to nvim_open_win.
                        conf = {
                                relative = "editor",
                                width = sidebar_width,
                                height = ui.height,
                                row = 0,
                                col = ui.width - sidebar_width,
                                style = "minimal",
                                border = "single",
                        }

                        return conf
                end,
        },
})
```

## nvim dap 配置

### adapter

需要为每个语言配置 adapter ，例如

```lua
dap.adapters.debugpy= {
        command = python_path,
        type = "executable",
        args = { "-m", "debugpy.adapter" },
        name = "debugpy",
}
```

adapter 是对应的调试器，配置中需要启动命令，参数，类型等等

### configurations

dap 会从 provider 中加载配置，默认dap.configurations和.vscode/launch.json

可以自定义 provider, see [:help dap](https://github.com/mfussenegger/nvim-dap/blob/5860c7c501eb428d3137ee22c522828d20cca0b3/doc/dap.txt#L1381)

configurations 里给对应adapter配置调试方式，可以指定多个

```lua
local python={}
python[#python + 1] = {
        type = "debugpy",
        name = "Launch File",
        request = "launch",
        program = debug_file,
        pythonPath = python_path,
}
dap.configurations.python = python
```

其中 type 是对应adapter的名称

### launch.json

launch.json attributes see https://code.visualstudio.com/docs/debugtest/debugging-configuration#_launchjson-attributes

每个 adapter 会提供一些扩展配置，去 adapter 文档查看，如：https://github.com/microsoft/debugpy/wiki/Debug-configuration-settings

```json
{
    "$schema": "https://raw.githubusercontent.com/mfussenegger/dapconfig-schema/master/dapconfig-schema.json",
    "version": "0.2.0",
    "configurations": [
        {
            "name": "dap name",
            "type": "adapter name",
            "request": "launch or attach",
            "mode": "debug",
            "program": "debug program",
            "console": "integratedTerminal",
            "env": {},
            "args": []
        }
    ]
}
```
