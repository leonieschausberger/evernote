<!DOCTYPE html>
<html lang="de">
    <head>
        <title>Evernote by Leonie</title>
    </head>
    <body>
        <h1>Hi, das ist Evernote</h1>
        <ul>
            @foreach ($collections as $collection)
                <li>><a href="collections/{{$collection->id}}">{{$collection->title}}: {{$collection->description}} mit der ID({{$collection->id}})</a></li>
            @endforeach
        </ul>
    </body>
</html>
