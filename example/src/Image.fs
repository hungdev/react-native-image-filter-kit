namespace FilterConstructor

open ReactNativeHelpers
open ReactNativeHelpers.Props
open Fable.Import


module Image =

  type Model' =
    { Name: string
      Source: IImageSourceProperties list }

  type Model =
    | Concrete of Model'
    | Random of Model'


  let (|ImageModel|) =
    function
    | Concrete i -> i
    | Random i -> i
   
  let name =
    function ImageModel image -> image.Name

  let source =
    function ImageModel image -> image.Source

  let equals first second =
    match first, second with
    | (Random _), (Random _) -> true
    | _ -> first = second  

  let random () =
    let id = JS.Math.round (JS.Math.random () * 992.)
    let timestamp = JS.Date.now ()
    let uri = sprintf "https://picsum.photos/%f?image=%f&t=%f" Constants.imageHeight id timestamp
    Random { Name = "Random"
             Source = [ ImageSourceProperties.Uri uri ] }  


  let defaultImage =
    Concrete { Name = "Parrot"
               Source = (localImage "${entryDir}/../parrot.png") }

  let availableImages =
    [| defaultImage
       Concrete { Name = "React logo"
                  Source = [ ImageSourceProperties.Uri "https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png" ]}
       Concrete { Name = "Triangle"
                  Source = [ ImageSourceProperties.Uri "http://thumbnails.visually.netdna-cdn.com/BizarreSierpinskiTriangle_510736b6b60fa.png" ] }
       random () |]
