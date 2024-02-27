# imnd-datepicker

**simple datepicker**

logic, template, localisation and styles are separated in different files. it uses imnd-dom library.

Usage:

```
  <form>
    <input type="file" id="file" />
    <input type="button" id="file-upload" value="Send" />
  </form>
 
  <script>
    import datepicker from 'imnd-datepicker';

    datepicker
      .defaults({
        class: 'datepicker',
        locale: 'en',
      })
      .build();
 </script>
```
