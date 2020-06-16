class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on('value',function(data){
            gameState = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        });
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }

        athlete1 = createSprite(50,200);
        athlete1.addImage("athlete1",athlete_img);
        athlete1.scale = 0.5;

        athlete2 = createSprite(50,350);
        athlete2.addImage("athlete2",athlete_img);
        athlete2.scale = 0.5;

        athlete3 = createSprite(50,500);
        athlete3.addImage("athlete3",athlete_img);
        athlete3.scale = 0.5;

        athlete4 = createSprite(50,650);
        athlete4.addImage("athlete4",athlete_img);
        athlete4.scale = 0.5;

        athletes = [athlete1,athlete2,athlete3,athlete4];
        
    }

    play(){
        form.hide();
        Player.getPlayerInfo();
        player.getCarsAtEnd();

        if(allPlayers !== undefined){
            background(198,135,103);
            image(track,0,-displayHeight*4,displayWidth,displayHeight*6);

            var index = 0;

            var x = 50;
            var y = 400;

            for (var plr in allPlayers){
                index = index+1;

                y = y+180;

                x = displayWidth - allPlayers[plr].distance;
                athletes[index-1].x = x;
                athletes[index-1].y = y;

                if(index===player.index){
                    //stroke(10);
                    //fill("red");
                    //ellipse(x,y,60,60);
                    athletes[index-1].shapeColor = "red";
                    camera.position.y = athletes[index-1].y;
                    camera.position.x = athletes[index-1].x;
                }
            }
        }

        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance -=50;
            player.update();
        }
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance +=50;
            player.update();
        }
      
          if(player.distance==-4000){
            gameState = 2;
            player.rank+=1;
            Player.updateCarsAtEnd(player.rank);
          }
         drawSprites();
    }
}