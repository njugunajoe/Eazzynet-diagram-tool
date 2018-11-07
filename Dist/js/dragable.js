//all occurs within .ready
(function($, undefined) {
    // set up background images
    $('.item').each(function(i, o) {
        $(o).css('background-image', 'url(' + $(o).data('src') + ')');
    });


    $('.item').draggable({
        cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        //revert: "invalid", // when not dropped, the item will revert back to its initial position
        revert: true, // bounce back when dropped
        helper: "clone", // create "copy" with original properties, but not a true clone
        cursor: "move",
        revertDuration: 0 // immediate snap
    });

    var $container
    $('.container').droppable({
        accept: "#items .item",
        activeClass: "ui-state-highlight",
        drop: function(event, ui) {
            // clone item to retain in original "list"
            var $item = ui.draggable.clone();

            $(this).addClass('has-drop').html($item);

        }
    });
})(jQuery);