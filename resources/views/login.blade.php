<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Вход </title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
    <main class="container my-5">
        <div class="row">
            <div class="col-8 offset-2">
                <div class="card">
                    <form class="card-body" id="form" method="POST">
                        <h1 class="mb-0"> Вход </h1>

                        @csrf

                        <div class="mt-3">
                            <label class="form-label"> Логин </label>
                            <input class="form-control" type="email" name="email">
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Пароль </label>
                            <input class="form-control" type="password" name="password">
                        </div>

                        <button class="btn btn-success mt-5"> Войти </button>
                    </form>
                </div>
            </div>
        </div>
    </main>
</body>
</html>