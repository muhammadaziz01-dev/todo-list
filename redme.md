### Komentari

```
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

```

 **todos** - bu ozgaruvchi locolstoragda list nomli key qiymati bo'lsa shuni o'ziga qiymat sifatidda oladi aksi bo'lsa o'zini bo
'sh massivga [] tenglab oladi .

<hr>

```
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}
```

- Bu funcsiya list nomi ostida "todos" nomli o'zgaruvchini loclstorg ga saqlab boradi qayyta qayta ishlatkanligimiz uchun buni funcsiyaga olib olganmiz .