# lua

```lua
--- __index，假如foo中寻找不到bar，就会去调用foo的__index，__index可以是函数，也可以是一个表，如果是表，就从表里寻找bar，如果是函数，就执行

--- 可以将一个表设置为实例的 metatable，模拟面向对象
--- ':' 是一个特殊的语法糖，foo:bar 会先从foo本身寻找元素，如果找不到就去foo的metatable的__index里找

local Bag = {}
Bag.__index = Bag

--- 构造函数不要使用 Bag:new 不需要接受自身为参数
Bag.new = function()
        local self = {
                items = {},
        }
        return setmetatable(self, Bag)
end

--- ':' 调用会将表自身作为第一个参数传入调用函数，默认 self
function Bag:put(item)
        table.insert(self.items, item)
end

function Bag.list(t)
        return t.items
end

local mybag = Bag:new()
mybag:put("hello")
mybag:put("world")

for _, v in pairs(mybag:list()) do
        print(v)
end
```
