import { Exam, Question } from '../types';

export const exams: Exam[] = [
  {
    id: '1',
    title: 'JavaScript基础测试',
    description: '测试您对JavaScript基础知识的掌握程度，包括变量、函数、作用域等核心概念。',
    questionCount: 10
  },
  {
    id: '2',
    title: 'React框架进阶',
    description: '深入测试React框架的高级特性，包括Hooks、状态管理、性能优化等。',
    questionCount: 8
  },
  {
    id: '3',
    title: 'TypeScript类型系统',
    description: '全面测试TypeScript类型系统的知识，包括接口、泛型、类型推断等。',
    questionCount: 12
  },
  {
    id: '4',
    title: 'CSS布局与样式',
    description: '测试CSS布局技术和样式设计能力，包括Flexbox、Grid、动画等。',
    questionCount: 8
  },
  {
    id: '5',
    title: 'HTML5新特性',
    description: '了解HTML5的新特性和API，包括语义化标签、多媒体、本地存储等。',
    questionCount: 6
  },
  {
    id: '6',
    title: 'Node.js后端开发',
    description: '测试Node.js后端开发技能，包括Express框架、数据库操作、API设计等。',
    questionCount: 10
  }
];

export const questions: Record<string, Question[]> = {
  '1': [
    {
      id: 'q1',
      sort: '1',
      title: '以下哪个关键字用于声明常量？',
      questionType: '单选题',
      options: { 'A': 'var', 'B': 'let', 'C': 'const', 'D': 'static' },
      correctAnswer: ['C'],
      analysis: 'const关键字用于声明常量，一旦赋值后不能重新赋值。var和let用于声明变量，static是类成员修饰符。'
    },
    {
      id: 'q2',
      sort: '2',
      title: '以下哪个方法用于向数组末尾添加元素？',
      questionType: '单选题',
      options: { 'A': 'push()', 'B': 'pop()', 'C': 'shift()', 'D': 'unshift()' },
      correctAnswer: ['A'],
      analysis: 'push()方法向数组末尾添加一个或多个元素，并返回新数组的长度。pop()删除末尾元素，shift()删除开头元素，unshift()向开头添加元素。'
    },
    {
      id: 'q3',
      sort: '3',
      title: 'JavaScript中，typeof null的返回值是什么？',
      questionType: '单选题',
      options: { 'A': '"null"', 'B': '"undefined"', 'C': '"object"', 'D': '"number"' },
      correctAnswer: ['C'],
      analysis: '这是JavaScript的一个历史遗留bug，typeof null返回"object"，虽然null不是一个真正的对象。'
    },
    {
      id: 'q4',
      sort: '4',
      title: '以下哪个不是JavaScript的基本数据类型？',
      questionType: '单选题',
      options: { 'A': 'string', 'B': 'number', 'C': 'array', 'D': 'boolean' },
      correctAnswer: ['C'],
      analysis: 'array是引用类型，不是基本数据类型。JavaScript的基本数据类型包括：string、number、boolean、undefined、null、symbol、bigint。'
    },
    {
      id: 'q5',
      sort: '5',
      title: 'Promise的三种状态不包括以下哪个？',
      questionType: '单选题',
      options: { 'A': 'pending', 'B': 'fulfilled', 'C': 'rejected', 'D': 'completed' },
      correctAnswer: ['D'],
      analysis: 'Promise只有三种状态：pending（等待中）、fulfilled（已成功）、rejected（已失败）。completed不是Promise的状态。'
    },
    {
      id: 'q6',
      sort: '6',
      title: '以下哪些方法可以阻止事件传播？',
      questionType: '多选题',
      options: { 'A': 'event.preventDefault()', 'B': 'event.stopPropagation()', 'C': 'event.stopBubbling()', 'D': 'event.cancelBubble()' },
      correctAnswer: ['B', 'D'],
      analysis: 'event.stopPropagation()和event.cancelBubble()都可以阻止事件冒泡。preventDefault()用于阻止默认行为。'
    },
    {
      id: 'q7',
      sort: '7',
      title: 'ES6中，箭头函数与普通函数的区别不包括？',
      questionType: '单选题',
      options: { 'A': '没有自己的this', 'B': '不能作为构造函数', 'C': '没有arguments对象', 'D': '不能返回值' },
      correctAnswer: ['D'],
      analysis: '箭头函数可以返回值，与普通函数一样。箭头函数的主要区别是：没有自己的this、不能作为构造函数、没有arguments对象。'
    },
    {
      id: 'q8',
      sort: '8',
      title: '以下哪些表达式的结果为true？',
      questionType: '多选题',
      options: { 'A': '[] === []', 'B': 'NaN === NaN', 'C': 'null == undefined', 'D': '"1" === 1' },
      correctAnswer: ['C'],
      analysis: 'null和undefined在使用==比较时是相等的。数组是引用类型，[] === []比较的是引用地址，不相等。NaN不等于任何值包括它自己。"1" === 1类型不同，不相等。'
    },
    {
      id: 'q9',
      sort: '9',
      title: 'map和forEach的主要区别是什么？',
      questionType: '单选题',
      options: { 'A': 'map返回新数组，forEach不返回', 'B': 'forEach更快', 'C': 'map不能修改原数组', 'D': 'forEach只能遍历数组' },
      correctAnswer: ['A'],
      analysis: 'map()方法返回一个新数组，包含每个元素经过回调函数处理后的结果。forEach()方法只是遍历数组，不返回任何值。'
    },
    {
      id: 'q10',
      sort: '10',
      title: '什么是闭包？',
      questionType: '单选题',
      options: { 'A': '一种循环结构', 'B': '函数内部访问外部变量的能力', 'C': '一种数据类型', 'D': 'JavaScript的错误处理机制' },
      correctAnswer: ['B'],
      analysis: '闭包是指有权访问另一个函数作用域中变量的函数。当内部函数引用了外部函数的变量时，就形成了闭包。'
    }
  ],
  '2': [
    {
      id: 'r1',
      sort: '1',
      title: 'React中，useEffect的依赖数组为空数组[]时，何时执行？',
      questionType: '单选题',
      options: { 'A': '每次渲染都执行', 'B': '只在组件挂载时执行', 'C': '只在组件卸载时执行', 'D': '永不执行' },
      correctAnswer: ['B'],
      analysis: '当依赖数组为空数组时，useEffect只在组件挂载时执行一次，相当于componentDidMount的效果。'
    },
    {
      id: 'r2',
      sort: '2',
      title: '以下哪些Hook用于管理组件状态？',
      questionType: '多选题',
      options: { 'A': 'useEffect', 'B': 'useContext', 'C': 'useState', 'D': 'useReducer' },
      correctAnswer: ['C', 'D'],
      analysis: 'useState和useReducer都可以用于管理组件状态。useState是最基本的状态管理Hook，useReducer适合复杂的状态逻辑。'
    },
    {
      id: 'r3',
      sort: '3',
      title: 'React中的key属性的主要作用是什么？',
      questionType: '单选题',
      options: { 'A': '样式美化', 'B': '帮助React识别列表项的变化', 'C': '传递数据', 'D': '事件绑定' },
      correctAnswer: ['B'],
      analysis: 'key属性帮助React识别哪些元素改变了、添加了或删除了，提高列表渲染性能。'
    },
    {
      id: 'r4',
      sort: '4',
      title: '以下哪个不是React的受控组件特点？',
      questionType: '单选题',
      options: { 'A': '表单值由React状态控制', 'B': '每次输入触发onChange事件', 'C': '表单值直接存储在DOM中', 'D': '适合复杂表单逻辑' },
      correctAnswer: ['C'],
      analysis: '受控组件的表单值存储在React状态中，而不是DOM中。非受控组件的值才直接存储在DOM中。'
    },
    {
      id: 'r5',
      sort: '5',
      title: 'React.memo的作用是什么？',
      questionType: '单选题',
      options: { 'A': '记忆函数结果', 'B': '防止组件不必要的重渲染', 'C': '缓存API响应', 'D': '优化图片加载' },
      correctAnswer: ['B'],
      analysis: 'React.memo是一个高阶组件，用于对组件的props进行浅比较，防止不必要的重渲染。'
    },
    {
      id: 'r6',
      sort: '6',
      title: 'useCallback和useMemo的区别是什么？',
      questionType: '单选题',
      options: { 'A': 'useCallback缓存函数，useMemo缓存计算结果', 'B': 'useMemo更快', 'C': 'useCallback只能用于事件处理', 'D': '没有区别' },
      correctAnswer: ['A'],
      analysis: 'useCallback缓存的是函数引用，useMemo缓存的是函数的返回值（计算结果）。两者都用于性能优化。'
    },
    {
      id: 'r7',
      sort: '7',
      title: 'React Context的作用是什么？',
      questionType: '单选题',
      options: { 'A': '路由管理', 'B': '跨组件传递数据', 'C': '状态持久化', 'D': '表单验证' },
      correctAnswer: ['B'],
      analysis: 'Context提供了一种在组件之间共享数据的方式，无需通过每一层组件传递props。'
    },
    {
      id: 'r8',
      sort: '8',
      title: '以下哪些生命周期方法在函数组件中有对应的Hook？',
      questionType: '多选题',
      options: { 'A': 'componentDidMount', 'B': 'componentWillUnmount', 'C': 'componentDidUpdate', 'D': 'componentWillMount' },
      correctAnswer: ['A', 'B', 'C'],
      analysis: 'componentDidMount、componentWillUnmount、componentDidUpdate都可以通过useEffect实现。componentWillMount在React 17中已被废弃，没有对应的Hook。'
    }
  ],
  '3': [
    {
      id: 't1',
      sort: '1',
      title: 'TypeScript中，interface和type的主要区别是什么？',
      questionType: '单选题',
      options: { 'A': '没有区别', 'B': 'interface可以合并声明，type不行', 'C': 'type只能定义对象类型', 'D': 'interface不能继承' },
      correctAnswer: ['B'],
      analysis: 'interface支持声明合并（declaration merging），多个同名interface会自动合并。type不支持此特性。'
    },
    {
      id: 't2',
      sort: '2',
      title: '以下哪个泛型约束表示T必须有length属性？',
      questionType: '单选题',
      options: { 'A': '<T extends string>', 'B': '<T extends { length: number }>', 'C': '<T extends any[]>', 'D': '<T extends object>' },
      correctAnswer: ['B'],
      analysis: '使用extends关键字配合对象类型来约束泛型，{ length: number }表示T必须有length属性且类型为number。'
    },
    {
      id: 't3',
      sort: '3',
      title: 'TypeScript中，typeof操作符的作用是什么？',
      questionType: '单选题',
      options: { 'A': '获取变量的类型', 'B': '类型转换', 'C': '类型断言', 'D': '定义类型别名' },
      correctAnswer: ['A'],
      analysis: 'typeof操作符用于获取变量或值的类型，可以在类型上下文中使用。'
    },
    {
      id: 't4',
      sort: '4',
      title: '以下哪个不是TypeScript的基础类型？',
      questionType: '单选题',
      options: { 'A': 'unknown', 'B': 'never', 'C': 'any', 'D': 'array' },
      correctAnswer: ['D'],
      analysis: 'array不是基础类型，它是一种类型结构。TypeScript的基础类型包括：string、number、boolean、undefined、null、any、unknown、never、symbol、bigint。'
    },
    {
      id: 't5',
      sort: '5',
      title: 'TypeScript中，as关键字的作用是什么？',
      questionType: '单选题',
      options: { 'A': '类型断言', 'B': '类型声明', 'C': '类型推断', 'D': '类型定义' },
      correctAnswer: ['A'],
      analysis: 'as关键字用于类型断言，告诉编译器"我知道这个值的类型是什么"，强制类型转换。'
    },
    {
      id: 't6',
      sort: '6',
      title: '以下哪个类型表示可能为null或undefined的值？',
      questionType: '单选题',
      options: { 'A': 'any', 'B': 'unknown', 'C': 'nullable', 'D': 'T | null | undefined' },
      correctAnswer: ['D'],
      analysis: 'TypeScript没有nullable类型，需要使用联合类型T | null | undefined来表示可能为空的值。'
    },
    {
      id: 't7',
      sort: '7',
      title: 'TypeScript中，enum的作用是什么？',
      questionType: '单选题',
      options: { 'A': '定义常量', 'B': '定义枚举类型', 'C': '类型转换', 'D': '错误处理' },
      correctAnswer: ['B'],
      analysis: 'enum用于定义枚举类型，枚举是一组有名字的常量集合。'
    },
    {
      id: 't8',
      sort: '8',
      title: '以下哪些是TypeScript的工具类型？',
      questionType: '多选题',
      options: { 'A': 'Partial', 'B': 'Pick', 'C': 'Record', 'D': 'keyof' },
      correctAnswer: ['A', 'B', 'C'],
      analysis: 'Partial、Pick、Record都是TypeScript的工具类型。keyof是操作符，不是工具类型。'
    },
    {
      id: 't9',
      sort: '9',
      title: 'TypeScript中，infer关键字的作用是什么？',
      questionType: '单选题',
      options: { 'A': '类型推断', 'B': '条件类型中提取类型', 'C': '类型断言', 'D': '类型定义' },
      correctAnswer: ['B'],
      analysis: 'infer关键字用于条件类型中，可以从类型中提取出某个类型并赋值给变量。'
    },
    {
      id: 't10',
      sort: '10',
      title: 'strictNullChecks选项开启后，以下哪些表达式会报错？',
      questionType: '多选题',
      options: { 'A': 'let x: string = null', 'B': 'let x: string | null = null', 'C': 'let x: string = "hello"', 'D': 'let x: number = undefined' },
      correctAnswer: ['A', 'D'],
      analysis: 'strictNullChecks开启后，null和undefined不能赋值给非空类型。A和D会报错，B和C是正确的写法。'
    },
    {
      id: 't11',
      sort: '11',
      title: 'TypeScript中，模块的默认导出使用哪个关键字？',
      questionType: '单选题',
      options: { 'A': 'export', 'B': 'import', 'C': 'export default', 'D': 'module.exports' },
      correctAnswer: ['C'],
      analysis: 'export default用于模块的默认导出，一个模块只能有一个默认导出。'
    },
    {
      id: 't12',
      sort: '12',
      title: '以下哪个不是TypeScript的编译选项？',
      questionType: '单选题',
      options: { 'A': 'target', 'B': 'module', 'C': 'strict', 'D': 'runtime' },
      correctAnswer: ['D'],
      analysis: 'runtime不是TypeScript的编译选项。常用选项包括target（目标JS版本）、module（模块系统）、strict（严格模式）等。'
    }
  ],
  '4': [
    {
      id: 'c1',
      sort: '1',
      title: 'Flexbox中，justify-content: center的作用是什么？',
      questionType: '单选题',
      options: { 'A': '垂直居中', 'B': '水平居中', 'C': '两端对齐', 'D': '均匀分布' },
      correctAnswer: ['B'],
      analysis: 'justify-content控制主轴（默认水平方向）上的对齐方式，center表示水平居中。'
    },
    {
      id: 'c2',
      sort: '2',
      title: 'CSS Grid中，grid-template-columns: repeat(3, 1fr)表示什么？',
      questionType: '单选题',
      options: { 'A': '3行等宽', 'B': '3列等宽', 'C': '重复3次1fr', 'D': '3个固定宽度列' },
      correctAnswer: ['B'],
      analysis: 'repeat(3, 1fr)表示创建3列，每列宽度为1fr（等分剩余空间）。'
    },
    {
      id: 'c3',
      sort: '3',
      title: 'CSS中，position: absolute的元素相对于什么定位？',
      questionType: '单选题',
      options: { 'A': '总是相对于body', 'B': '相对于最近的定位祖先元素', 'C': '相对于父元素', 'D': '相对于视口' },
      correctAnswer: ['B'],
      analysis: 'absolute定位的元素相对于最近的非static定位的祖先元素定位，如果没有则相对于初始包含块（通常是视口）。'
    },
    {
      id: 'c4',
      sort: '4',
      title: '以下哪些CSS属性用于创建动画效果？',
      questionType: '多选题',
      options: { 'A': 'transition', 'B': 'animation', 'C': 'transform', 'D': 'all' },
      correctAnswer: ['A', 'B'],
      analysis: 'animation属性用于创建关键帧动画，transition用于过渡效果。transform用于变换，不是动画属性。'
    },
    {
      id: 'c5',
      sort: '5',
      title: 'CSS中，box-sizing: border-box的作用是什么？',
      questionType: '单选题',
      options: { 'A': '只显示边框', 'B': '宽高包含padding和border', 'C': '隐藏边框', 'D': '添加阴影' },
      correctAnswer: ['B'],
      analysis: 'border-box模式下，元素的width和height包含content、padding和border，便于布局计算。'
    },
    {
      id: 'c6',
      sort: '6',
      title: '以下哪个不是CSS选择器？',
      questionType: '单选题',
      options: { 'A': 'element', 'B': '.class', 'C': '#id', 'D': '=value' },
      correctAnswer: ['D'],
      analysis: '=value不是CSS选择器。CSS选择器包括：元素选择器、类选择器、ID选择器、属性选择器（如[attr=value]）等。'
    },
    {
      id: 'c7',
      sort: '7',
      title: 'CSS中，z-index的作用是什么？',
      questionType: '单选题',
      options: { 'A': '控制元素宽度', 'B': '控制元素堆叠顺序', 'C': '控制元素透明度', 'D': '控制元素位置' },
      correctAnswer: ['B'],
      analysis: 'z-index控制定位元素在堆叠上下文中的层级，数值越大越靠上。'
    },
    {
      id: 'c8',
      sort: '8',
      title: '以下哪些CSS特性用于响应式布局？',
      questionType: '多选题',
      options: { 'A': '@media', 'B': 'flex-wrap', 'C': 'grid-template', 'D': 'all' },
      correctAnswer: ['A', 'B'],
      analysis: '@media规则用于媒体查询，可以根据设备特性应用不同的样式。flex-wrap用于Flexbox的换行，也是响应式布局的重要特性。'
    }
  ],
  '5': [
    {
      id: 'h1',
      sort: '1',
      title: 'HTML5中，<header>标签的作用是什么？',
      questionType: '单选题',
      options: { 'A': '定义表格头部', 'B': '定义文档头部', 'C': '定义导航', 'D': '定义表单' },
      correctAnswer: ['B'],
      analysis: '<header>标签定义文档或节的头部，通常包含标题、导航、logo等内容。'
    },
    {
      id: 'h2',
      sort: '2',
      title: 'HTML5中，localStorage的特点是什么？',
      questionType: '单选题',
      options: { 'A': '数据随会话结束消失', 'B': '数据永久保存（除非手动清除）', 'C': '只能存储字符串', 'D': '存储大小无限制' },
      correctAnswer: ['B'],
      analysis: 'localStorage的数据会永久保存，除非用户手动清除或通过代码删除。sessionStorage的数据随会话结束消失。'
    },
    {
      id: 'h3',
      sort: '3',
      title: 'HTML5中，<canvas>标签的作用是什么？',
      questionType: '单选题',
      options: { 'A': '播放视频', 'B': '绘制图形', 'C': '定义图表', 'D': '展示图片' },
      correctAnswer: ['B'],
      analysis: '<canvas>标签用于通过JavaScript绘制图形、动画等，是HTML5的核心绘图API。'
    },
    {
      id: 'h4',
      sort: '4',
      title: 'HTML5中，<video>标签支持的格式不包括？',
      questionType: '单选题',
      options: { 'A': 'MP4', 'B': 'WebM', 'C': 'OGG', 'D': 'AVI' },
      correctAnswer: ['D'],
      analysis: '<video>标签支持MP4、WebM、OGG格式，不支持AVI格式。'
    },
    {
      id: 'h5',
      sort: '5',
      title: 'HTML5中，data-*属性的作用是什么？',
      questionType: '单选题',
      options: { 'A': '定义数据类型', 'B': '存储自定义数据', 'C': '数据验证', 'D': '数据绑定' },
      correctAnswer: ['B'],
      analysis: 'data-*属性用于存储页面或应用的私有自定义数据，可以通过JavaScript访问。'
    },
    {
      id: 'h6',
      sort: '6',
      title: 'HTML5中，<article>标签的作用是什么？',
      questionType: '单选题',
      options: { 'A': '定义文章内容', 'B': '定义侧边栏', 'C': '定义导航', 'D': '定义页脚' },
      correctAnswer: ['A'],
      analysis: '<article>标签定义独立的、完整的内容块，如博客文章、新闻报道等。'
    }
  ],
  '6': [
    {
      id: 'n1',
      sort: '1',
      title: 'Express中，app.use()的作用是什么？',
      questionType: '单选题',
      options: { 'A': '处理GET请求', 'B': '处理POST请求', 'C': '挂载中间件', 'D': '路由重定向' },
      correctAnswer: ['C'],
      analysis: 'app.use()用于挂载中间件，中间件可以处理请求、响应或执行任何其他功能。'
    },
    {
      id: 'n2',
      sort: '2',
      title: 'Node.js中，require()和import的区别是什么？',
      questionType: '单选题',
      options: { 'A': '没有区别', 'B': 'require是CommonJS，import是ESM', 'C': 'import只能在浏览器中使用', 'D': 'require只能同步加载' },
      correctAnswer: ['B'],
      analysis: 'require()是CommonJS模块系统的语法，import是ES模块（ESM）的语法。Node.js 14+支持ESM。'
    },
    {
      id: 'n3',
      sort: '3',
      title: 'Node.js中，Buffer的作用是什么？',
      questionType: '单选题',
      options: { 'A': '缓存数据', 'B': '处理二进制数据', 'C': '文件系统操作', 'D': '网络请求' },
      correctAnswer: ['B'],
      analysis: 'Buffer用于处理二进制数据，是Node.js中处理TCP流、文件系统操作等的基础。'
    },
    {
      id: 'n4',
      sort: '4',
      title: 'Express中，res.json()的作用是什么？',
      questionType: '单选题',
      options: { 'A': '发送HTML响应', 'B': '发送JSON响应', 'C': '重定向', 'D': '设置响应头' },
      correctAnswer: ['B'],
      analysis: 'res.json()用于发送JSON格式的响应，会自动设置Content-Type为application/json。'
    },
    {
      id: 'n5',
      sort: '5',
      title: 'Node.js中，事件循环的执行顺序是什么？',
      questionType: '单选题',
      options: { 'A': 'timers → poll → check', 'B': 'poll → timers → check', 'C': 'check → poll → timers', 'D': 'timers → check → poll' },
      correctAnswer: ['A'],
      analysis: '事件循环的执行顺序：timers（定时器回调）→ I/O callbacks → idle/prepare → poll（轮询）→ check（setImmediate）→ close callbacks。'
    },
    {
      id: 'n6',
      sort: '6',
      title: '以下哪个不是Node.js的核心模块？',
      questionType: '单选题',
      options: { 'A': 'fs', 'B': 'http', 'C': 'path', 'D': 'express' },
      correctAnswer: ['D'],
      analysis: 'express是第三方框架，不是Node.js的核心模块。核心模块包括fs、http、path、url等。'
    },
    {
      id: 'n7',
      sort: '7',
      title: 'Node.js中，__dirname表示什么？',
      questionType: '单选题',
      options: { 'A': '当前文件名', 'B': '当前目录路径', 'C': '项目根目录', 'D': '模块路径' },
      correctAnswer: ['B'],
      analysis: '__dirname是一个全局变量，表示当前模块所在的目录的绝对路径。'
    },
    {
      id: 'n8',
      sort: '8',
      title: 'Express中，路由参数的获取方式是什么？',
      questionType: '单选题',
      options: { 'A': 'req.query', 'B': 'req.body', 'C': 'req.params', 'D': 'req.headers' },
      correctAnswer: ['C'],
      analysis: 'req.params用于获取路由参数（如/user/:id中的id），req.query用于获取查询参数，req.body用于获取请求体。'
    },
    {
      id: 'n9',
      sort: '9',
      title: 'Node.js中，process.env的作用是什么？',
      questionType: '单选题',
      options: { 'A': '进程环境变量', 'B': '进程ID', 'C': '进程状态', 'D': '进程退出码' },
      correctAnswer: ['A'],
      analysis: 'process.env是一个包含用户环境变量的对象，常用于存储配置信息如数据库连接字符串。'
    },
    {
      id: 'n10',
      sort: '10',
      title: 'Express中，next()的作用是什么？',
      questionType: '单选题',
      options: { 'A': '结束请求', 'B': '调用下一个中间件', 'C': '重定向', 'D': '发送响应' },
      correctAnswer: ['B'],
      analysis: 'next()用于调用中间件链中的下一个中间件，是Express中间件机制的核心。'
    }
  ]
};

export const mockLogin = (username: string, password: string) => {
  if (username === 'admin' && password === '123456') {
    return {
      success: true,
      token: 'mock-token-' + Date.now(),
      user: { username }
    };
  }
  return {
    success: false,
    token: '',
    user: null
  };
};

export const getExamById = (id: string): Exam | undefined => {
  return exams.find(exam => exam.id === id);
};

export const getQuestionsByExamId = (examId: string): Question[] => {
  return questions[examId] || [];
};