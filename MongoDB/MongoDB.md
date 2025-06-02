# MongoDB

## Índice
(pendiente)

## Descarga e instalación de MongoDB

### En Windows
1. Ve al sitio oficial de MongoDB: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
2. Descarga el instalador para Windows.
3. Ejecuta el instalador y sigue las instrucciones:
    - Selecciona la opción "Complete" durante la instalación.
    - Asegúrate de marcar la opción para instalar MongoDB como un servicio.
4. Una vez instalado, verifica la instalación abriendo una terminal y ejecutando:
    ```bash
    mongod --version
    ```



### En macOS (usando Homebrew)
1. Abre una terminal y ejecuta el siguiente comando para instalar MongoDB:
    ```bash
    brew tap mongodb/brew
    brew install mongodb-community@7.0
    ```
2. Inicia el servicio de MongoDB:
    ```bash
    brew services start mongodb/brew/mongodb-community
    ```
3. Verifica la instalación ejecutando:
    ```bash
    mongod --version
    ```

### Ejemplo: Instalación de colecciones de ejemplo
1. Descarga los datos de ejemplo desde el repositorio oficial de MongoDB: [https://www.mongodb.com/docs/manual/tutorial/sample-datasets/](https://www.mongodb.com/docs/manual/tutorial/sample-datasets/).
2. Importa una colección de ejemplo usando el comando `mongoimport`. Por ejemplo:
    ```bash
    mongoimport --db ejemploDB --collection restaurantes --file restaurantes.json --jsonArray
    ```
    - `--db ejemploDB`: Especifica el nombre de la base de datos.
    - `--collection restaurantes`: Especifica el nombre de la colección.
    - `--file restaurantes.json`: Ruta al archivo JSON con los datos.
    - `--jsonArray`: Indica que el archivo contiene un array de documentos JSON.

    Descargarse `sample_training.zip` para los ejercicios:
    ```bash
    git clone https://github.com/neelabalan/mongodb-sample-dataset.git
    cd mongodb-sample-dataset/sample_training
    ```

    Luego ejecuta estos comandos para importar cada archivo en la base de datos sample_training:

    ```bash
    mongoimport --db sample_training --collection companies --file companies.json
    mongoimport --db sample_training --collection inspections --file inspections.json
    mongoimport --db sample_training --collection routes --file routes.json
    mongoimport --db sample_training --collection trips --file trips.json
    mongoimport --db sample_training --collection zips --file zips.json
    mongoimport --db sample_training --collection grades --file grades.json
    mongoimport --db sample_training --collection posts --file posts.json
    mongoimport --db sample_training --collection stories --file stories.json
    mongoimport --db sample_training --collection tweets --file tweets.json
    ```
    Puedes repetir el comando para cada archivo .json que veas en esa carpeta.

3. Verifica que los datos se hayan importado correctamente:
    ```bash
    mongo
    use ejemploDB
    db.restaurantes.find().pretty()
    ```

## Básicos de configuración

### Shell
- `cls`: Limpiar la consola.
- `show dbs`: Mostrar las bases de datos.
- `db`: Devuelve el nombre de la base de datos activa.
- `use <nombre_db>`: Cambiar a una base de datos concreta.

### Collections
- `show collections`: Muestra las colecciones de la DB activas.
- `db.createCollection(<name>, <options>)`: Crea una nueva colección (crea automáticamente si no existe).
- `db.<collection>.drop()`: Elimina la colección

### Read
- `db.<collection>.findOne()`: Devuelve un elemento de la colección.
- `db.<collection>.find()`: Devileve todos los elementos de la colección. Si hay más de 20, devuelve 20 y un puntero.
- `db.<collection>.find().pretty`: Lo presenta de una forma más fácil de leer.
- `db.<collection>.find().count()`
- `db.<collection>.find(<query>)`: Query para filtrar la búsqueda
```js
db.zips.find({"state": "AL"}).count()
```

### Insert
- `db.<collection>.insertOne(<document>)`
- `db.<collection>.insertMany([<document1>, <document2>,...])`
Al insertar un elemento, si no existe la base de datos o la colección, la crea en ese momento. 
```js
db.libros.insertMany([
  { titulo: "1984", autor: "George Orwell", año: 1949 },
  { titulo: "Fahrenheit 451", autor: "Ray Bradbury", año: 1953 }
]);
```

### _id
Clave primaria (único por documento)
- Puede ser de cualqiuer tipo excepto array o regex.
- Si no lo indicamos al insertar, se genera un `ObjectId`.
- Es inmmutable.
- Al insertar un documento con un `_id`que ya existe, salta una excepción:
    + **E1100** duplicate key error collection.
    + Si estábamos insertando múltiples, no se insertarán los que fallen. Podemos añadir `{"ordered": false}`para que sí. 

### Update
- `db.<collection>.updateOne(filter, update, options)`
- `db.<collection>.updateMany(filter, update, options)`: actualiza el valor de un campo.
    + Filter: selección del criterio.
    + Update: Modificación a aplicar
- `db.<collection>.replaceOne(filter, replacement, options)`: Reemplazar un documento por otro. 

    ```js
    db.libros.updateOne(
    { titulo: "1984" },
    { $set: { autor: "George Orwell (Revisado)" } }
    );

    db.libros.updateMany(
    { año: { $lt: 2000 } },
    { $set: { disponible: true } }
    );

    db.libros.replaceOne(
    { titulo: "Fahrenheit 451" },
    { titulo: "Fahrenheit 451", autor: "Ray Bradbury", año: 1953, disponible: true }
    );
    ```

### Delete
- `db.<collection>.deleteOne(filter, options)`
- `db.<collection>.deleteMany(filter, options)`

---

## Operadores
### Comparadores
- `$eq`: Igual a un valor específico.
    ```js
    db.libros.find({ año: { $eq: 1953 } });
    ```
- `$ne`: No igual a un valor específico.
    ```js
    db.libros.find({ año: { $ne: 1953 } });
    ```
- `$gt`: Mayor que.
    ```js
    db.libros.find({ año: { $gt: 2000 } });
    ```
- `$gte`: Mayor o igual que.
    ```js
    db.libros.find({ año: { $gte: 2000 } });
    ```
- `$lt`: Menor que.
    ```js
    db.libros.find({ año: { $lt: 2000 } });
    ```
- `$lte`: Menor o igual que.
    ```js
    db.libros.find({ año: { $lte: 2000 } });
    ```
- `$in`: Coincide con cualquiera de los valores en un array.
    ```js
    db.libros.find({ año: { $in: [1949, 1953] } });
    ```
- `$nin`: No coincide con ninguno de los valores en un array.
    ```js
    db.libros.find({ año: { $nin: [1949, 1953] } });
    ```

### Operadores Lógicos
- `$and`: Combina múltiples condiciones (todas deben cumplirse).
    ```js
    db.libros.find({ $and: [{ año: { $gte: 1950 } }, { disponible: true }] });
    ```
- `$or`: Combina múltiples condiciones (al menos una debe cumplirse).
    ```js
    db.libros.find({ $or: [{ año: { $lt: 1950 } }, { disponible: false }] });
    ```
- `$not`: Niega una condición.
    ```js
    db.libros.find({ año: { $not: { $gte: 2000 } } });
    ```
- `$nor`: Ninguna de las condiciones debe cumplirse.
    ```js
    db.libros.find({ $nor: [{ año: { $lt: 1950 } }, { disponible: false }] });
    ```

#### Expressive `$expr` en MongoDB

El operador `$expr` permite usar expresiones agregadas dentro de consultas regulares. Esto es útil para realizar comparaciones entre campos del mismo documento o para usar operadores condicionales.

##### Ejemplo: Comparación entre campos
```js
db.ventas.find({
    $expr: {
        $gt: ["$cantidad", "$stock"]
    }
});
```
En este ejemplo, se seleccionan los documentos donde el campo `cantidad` es mayor que el campo `stock`.

##### Ejemplo: Uso de operadores condicionales
```js
db.ventas.find({
    $expr: {
        $cond: {
            if: { $gte: ["$cantidad", 100] },
            then: true,
            else: false
        }
    }
});
```
Aquí se evalúa una condición y se devuelve un valor basado en el resultado.

##### Ejemplo: Combinación con otros operadores
```js
db.ventas.find({
    $and: [
        { categoria: "electrónica" },
        {
            $expr: {
                $lt: ["$precio", "$precioPromocion"]
            }
        }
    ]
});
```
Este ejemplo busca documentos de la categoría `electrónica` donde el precio sea menor que el precio de promoción.

#### Operadores Array

- `$push`: Añade un elemento a un array. Si el campo no existe, lo crea.
    ```js
    db.libros.updateOne(
      { titulo: "1984" },
      { $push: { comentarios: "Excelente libro" } }
    );
    ```
- También se puede usar con modificadores como `$each`, `$sort`, `$slice`, etc., para mayor control:
    ```js
    db.libros.updateOne(
        { titulo: "1984" },
        {
        $push: {
            comentarios: {
                $each: ["Muy interesante", "Recomendado"],
                $sort: 1,
                $slice: 5
            }
        }
        }
    );
    ```
    En este ejemplo:
    - `$each`: Añade múltiples elementos.
    - `$sort`: Ordena los elementos del array.
    - `$slice`: Limita el tamaño del array.

- `$all:[...]` para buscar arrays que contengan al menos esos elementos.
    ```js
    db.listingsAndReviews.find({
        "amenities": {
            $all: ["Kitchen", "Wifi", "Internet", "Heating"]
        }
    })
    ```
- `$size` para especificar un tamaño exacto del array.
    ```js
    db.listingsAndReviews.find({"amenities": {"$size": 55}}).count()
    ```
---

## Proyecciones 
`db.<collection>.find({<query>}, {<projection>})`: permite obtener solo los campos que queremos. 
- Incluir ciertos campos (por defecto _id siempre aparece): `{<field1>: 1, <field2>: 1}` 
- Excluir ciertos campos:`{<field1>: 0, <field2>: 0}` 
Nota: No se puede mezclar la notación del **0** y del **1** excepto para excluir a *_id*

```js
db.listingsAndReviews.find(
    {"amenities": "Wifi"}, 
    {"price": 1, "maximum_nights": 0} # MAL
    )
db.listingsAndReviews.find(
    {"amenities": "Wifi"}, 
    {"price": 1, "maximum_nights": 1} # BIEN
    )
```
- `$elemMatch`: Usado con arrays, los proyecta sólo si tienen un elemento que cumpla el criterio.
    ```js
    db.listingsAndReviews.find(
        {"class_id": 431},
        {"scores": {"$elemMatch": {"score": {"$gt":85}}}}
    )
    ```
- `Dot Notation`: Usada para recorrer docuentos. 
    + Se pueden usar números para las posiciones de los arrays.
    + Tiene que estar entre comillas.
    + Ejemplo:
    ```js
    db.listingsAndReviews.find(
        {"relationships.0.person.last_name": "Zuckerberg"}, 
        {"name": 1}
    )
    ```
    Busca documentos donde el primer elemento (0) del array relationships tenga un campo person.last_name con el valor "Zuckerberg".

    Si hay un documento así: 
    ```json
    {
    "name": "Casa Bonita",
    "relationships": [
        { "person": { "last_name": "Zuckerberg" } }
    ]
    }
    ```

    El resultado será: `{ "name": "Casa Bonita" }``

## Expresiones regulares

Las expresiones regulares (regex) permiten realizar búsquedas avanzadas y coincidencias de patrones en los documentos.

### Ejemplos:
- Buscar documentos donde un campo comience con una letra específica:
    ```js
    db.libros.find({ titulo: { $regex: /^F/, $options: "i" } });
    ```
    - `^F`: Coincide con títulos que comienzan con "F".
    - `$options: "i"`: Ignora mayúsculas y minúsculas.

- Buscar documentos donde un campo termine con un valor específico:
    ```js
    db.libros.find({ titulo: { $regex: /451$/ } });
    ```
    - `451$`: Coincide con títulos que terminan en "451".

- Buscar documentos que contengan una palabra específica:
    ```js
    db.libros.find({ titulo: { $regex: /libro/, $options: "i" } });
    ```
    - `/libro/`: Coincide con títulos que contienen "libro".

- Buscar documentos con un patrón más complejo:
    ```js
    db.libros.find({ titulo: { $regex: /^[A-Z].*\d{4}$/, $options: "i" } });
    ```
    - `^[A-Z]`: Comienza con una letra mayúscula.
    - `.*`: Cualquier número de caracteres.
    - `\d{4}$`: Termina con cuatro dígitos.

Las expresiones regulares son útiles para búsquedas flexibles y personalizadas en MongoDB.

## Agregaciones
Pipeline para realizar operaciones sobre los datos. Compuesto de varias etapas (stages). \
`db.<collection>.aggregate([ { <stage>} , ... ])` \
Stages:
- $match
- $project
- $group

### $Match
`{$match: {<query>}}`\
- Devuelven todos los documentos que cumplan con la query.
- Querys son equivalentes a las de lectura (find)
```js
db.ListingAndReviews.aggregate(
    [{"$match": {"amenities", "Wifi" }}]
)
```

### $Project
`{$project: {<specification(s)>}}`\
Permite definir qué campos incluir o excluir en el resultado, así como realizar transformaciones o cálculos sobre los datos proyectados.
```js
db.ListingAndReviews.aggregate(
    [
        {"$match": {"amenities", "Wifi" }},
        {"$project": {"price": 1, "address": 1}}
    ]
)
```

### $group

El operador `$group` permite agrupar documentos en categorías y realizar operaciones de agregación sobre ellos. Es útil para calcular estadísticas, totales, promedios, etc.

##### Sintaxis básica:
```js
{
    $group: {
        _id: <expression>, // Campo por el cual agrupar
        <field1>: { <accumulator>: <expression> },
        <field2>: { <accumulator>: <expression> },
        ...
    }
}
```

- `_id`: Define el criterio de agrupación. Puede ser un campo existente, una expresión o `null` (para agrupar todos los documentos en una sola categoría).
- `<accumulator>`: Operador de acumulación como `$sum`, `$avg`, `$min`, `$max`, `$push`, `$addToSet`, etc.

##### Ejemplo 1: Contar documentos por categoría
```js
db.ventas.aggregate([
    {
        $group: {
            _id: "$categoria", // Agrupa por el campo "categoria"
            totalVentas: { $sum: 1 } // Cuenta el número de documentos en cada grupo
        }
    }
]);
```

##### Ejemplo 2: Calcular el total de ventas por categoría
```js
db.ventas.aggregate([
    {
        $group: {
            _id: "$categoria",
            totalIngresos: { $sum: "$monto" } // Suma el campo "monto" en cada grupo
        }
    }
]);
```

##### Ejemplo 3: Obtener el promedio de ventas por categoría
```js
db.ventas.aggregate([
    {
        $group: {
            _id: "$categoria",
            promedioVentas: { $avg: "$monto" } // Calcula el promedio del campo "monto"
        }
    }
]);
```

##### Ejemplo 4: Agrupar todos los documentos
```js
db.ventas.aggregate([
    {
        $group: {
            _id: null, // Agrupa todos los documentos en una sola categoría
            totalVentas: { $sum: 1 },
            totalIngresos: { $sum: "$monto" }
        }
    }
]);
```

##### Ejemplo 5: Crear arrays con `$push` y `$addToSet`
- `$push`: Añade todos los valores al array, incluyendo duplicados.
- `$addToSet`: Añade solo valores únicos al array.
```js
db.ventas.aggregate([
    {
        $group: {
            _id: "$categoria",
            productos: { $push: "$producto" }, // Incluye duplicados
            productosUnicos: { $addToSet: "$producto" } // Solo valores únicos
        }
    }
]);
```
---

## Cursor Method
Métodos que se aplican a un cursor (por ejemplo, en un find() )
Ejemplos: 
- count()
- limit()
- pretty()
- skip()
- sort()

### Skip
`skip(<offset>)`\
Número de elementos al principio que ignoro. 
```js
db.ventas.find().skip(10)
```
### Sort
`sort(<field1>: <value1>, <field2>: <value2>, ...)`  \
- Ordena los elementos. 
- Si no hay un campo único, el resultado puede ser incosistente. 
- Máximo de 32 fields.
- Value: **1** para orden ascendente y **-1** para descendente.
```js
db.ventas.find().sort({"pop": -1}).limit(5)
```

## Índices
`db.<collections>.createIndex()`\
- Crea un índice para facilitar las búsquedas.
- Hay creado un índice por defecto para *_id*.

![Esquema índice](indexSchema.jpeg)

## Upsert
`db.<collection>.UpdateOne({<query>}, {<update>}, {"upsert": true})`\
Híbrido entre Update e Insert:
- Si **existe** una coindidencia --> se actualiza.
- Si **NO existe** una coindidencia --> se inserta.

```js
db.libros.updateOne(
    { titulo: "El Principito" }, // Query para buscar el documento
    { $set: { autor: "Antoine de Saint-Exupéry", año: 1943 } }, // Actualización a realizar
    { upsert: true } // Si no existe, lo inserta
);
```
- Si existe un libro con el título "El Principito", se actualiza con el autor y el año.
- Si no existe, se crea un nuevo documento con esos datos.

```js
db.usuarios.updateOne(
    { email: "usuario@example.com" }, // Query para buscar el documento
    { $set: { nombre: "Usuario Ejemplo" }, $setOnInsert: { fechaRegistro: new Date() } }, // Actualización y campo adicional
    { upsert: true } // Si no existe, lo inserta
);
```
- Si existe un usuario con el email "usuario@example.com", se actualiza el nombre.
- Si no existe, se crea un nuevo documento con el nombre y la fecha de registro.

---

## Validación
MongoDB permite usar JSON Schema
- Se puede configurar al crear una colección.
    **Ejemplo:**
    ```js
    db.createCollection("usuarios", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["nombre", "email"],
                properties: {
                    nombre: {
                        bsonType: "string",
                        description: "Debe ser una cadena y es obligatorio"
                    },
                    email: {
                        bsonType: "string",
                        pattern: "^.+@.+\\..+$",
                        description: "Debe ser un email válido y es obligatorio"
                    },
                    edad: {
                        bsonType: "int",
                        minimum: 18,
                        description: "Debe ser un número entero mayor o igual a 18"
                    }
                }
            }
        }
    });
    ```

- También se puede configurar a posteriori.
    **Ejemplo:**
    ```js
    db.runCommand({
        collMod: "usuarios",
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["nombre", "email"],
                properties: {
                    nombre: {
                        bsonType: "string",
                        description: "Debe ser una cadena y es obligatorio"
                    },
                    email: {
                        bsonType: "string",
                        pattern: "^.+@.+\\..+$",
                        description: "Debe ser un email válido y es obligatorio"
                    }
                }
            }
        },
        validationLevel: "strict"
    });
    ```

- Si no es válido el elemento:
    + Devuelve un error (opción por defecto).
    + Se puede configurar para que devuelva un warning.
        **Ejemplo:**
        ```js
        db.runCommand({
            collMod: "usuarios",
            validationAction: "warn"
        });
        ```

> **Nota:** BSON (Binary JSON) es una codificación binaria de documentos similares a JSON. Se utiliza en MongoDB para almacenar y transferir datos, soportando tipos adicionales como ObjectId, Date y datos binarios.

## Modelado de datos
- Una forma de organizar los campos en un documento para apoyar el renidmiento de tu aplicación y las capacidades de consulta. 
- Los datos se alamcenan de la manera en la que se usan. 
- Los datos que se usan juntos deben mantenerse juntos. 
