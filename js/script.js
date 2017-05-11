(function() {    
    var ouer_square = 20,
        square_on_line = 5,
        square = [],
        download_square = [],
        make = true,
        motion = 0,
        for_square = 0,
        image = [
        'square_1.png',
        'square_2.png',
        'square_3.png',
        'square_4.png',
        'square_5.png',
        'square_6.png',
        'square_7.png',
        'square_8.png',
        'square_9.png',
        'square_10.png'
        ],
        player = {
            name: ''
        },
        playerNameElem = document.getElementById('playername');

    function startGame() {
        $('#stage').hide();
        $('.start_game').fadeOut(100);
        $('.board').fadeIn(2000);
        $('.player-stats').fadeIn(3000);
        player.name = prompt('Wpisz swoje imię', 'Twoje imię');
        if (player.name) {
            playerNameElem.innerHTML = 'Gracz: ' + player.name;
        }
        square = [];
        download_square = [];
        make = true;
        motion = 0;
        for_square = 0;

        var board = $('.board').empty();

        for (var i=0; i<ouer_square; i++) {
            square.push(Math.floor(i/2));
        }

        for (i=ouer_square-1; i>0; i--) {
            var swap = Math.floor(Math.random()*i);
            var tmp = square[i];
            square[i] = square[swap];
            square[swap] = tmp;
        }

        for (i=0; i<ouer_square; i++) {
            var tile = $('<div class="square"></div>');
            board.append(tile);
            tile.data('cardType',square[i]);
            tile.data('index', i);
            tile.css({
                left : 5+(tile.width()+5)*(i%square_on_line)
            });
            tile.css({
                top : 5+(tile.height()+5)*(Math.floor(i/square_on_line))
            });
            tile.bind('click',function() {square_click($(this))});
        }
        $('.moves').html(motion);
    }

    function square_click(element) {
        if (make) {
            if (!download_square[0] || (download_square[0].data('index') != element.data('index'))) {
                download_square.push(element);
                element.css({'background-image' : 'url(img/'+image[element.data('cardType')]+')'})    
            }

            if (download_square.length == 2) {
                make = false;
                if (download_square[0].data('cardType')==download_square[1].data('cardType')) {
                    window.setTimeout(function() {
                        delete_square();
                    }, 500);
                } else {
                    window.setTimeout(function() {
                        reset_square();
                    }, 500);
                }
                motion++;
                $('.moves').html(motion)
            }
        }
    }

    function delete_square() {
        download_square[0].fadeOut(function() {
            $(this).remove();
        });
        download_square[1].fadeOut(function() {
            $(this).remove();

            for_square++;
            if (for_square >= ouer_square / 2) {
                $('.board').fadeOut(2000);
                $('.player-stats').fadeOut(300);
                $('#playername').fadeOut(300);
                saveMatch();
                showMatch();
                $('#stage').show(1000);
                $('.rematch').fadeIn(100);
            }
            make = true;
            download_square = new Array();
        });
    }

    function reset_square() {
        download_square[0].css({'background-image':'url(img/square.png)'})
        download_square[1].css({'background-image':'url(img/square.png)'})
        download_square = new Array();
        make = true;
    }
    function showMatch() {
        /*$.ajax({
            url : 'save.php',
            type : 'POST',            
            data : {
                action : 'read'                
            },
            dataType : 'json',
            success : function(r) {                
                $('#highscoreBoard').empty();
                for (x=0; x<r.length; x++) {
                    var record = r[x];                    
                    var $div = $('<div class="line"><strong class="player">'+record.player+' :</strong><span class="moves">'+record.moves+'</span></div>');
                    $('#highscore').append($div);
                }                   
            },         
            error : function() {
                console.log('Wystąpił jakiś błąd')                
            },
            complete : function() {
                $('#stage').show();
            }
        })*/
        
    }
    function saveMatch() {
    /*$.ajax({
        url : 'stat.php',
        type : 'POST',            
        data : {
            action : 'save',
            player : player.name,
            moves  : motion 
        },
        success : function() {
        },         
        error : function() {
            console.log('Wystąpił jakiś błąd')
        },
        complete : function() {
            console.log('ok')          
        }
    })*/

    }

    $(document).ready(function() {
        showMatch();
        $('.start_game, .rematch').click(function() {
            startGame();
        });

    })
})();