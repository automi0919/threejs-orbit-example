/* Utils namespace */
THREE.utils = THREE.utils || {};

THREE.utils.enableDebug = function( object ) {

  if ( typeof object === 'undefined' ) {
    throw new Error("Invalid argument");
  }

  /* object is a scene, enable for all meshes */
  if ( object instanceof THREE.Scene ) {
    if ( this.hasChildrenOfInstance(object, THREE.Mesh) ) {
      object.children.forEach( function( child ) {
        THREE.utils.enableDebug( child );
      });
      return;
    }
  }

  /* object is a mesh */
  if ( object instanceof THREE.Mesh ) {

    /* Add axis helper */
    object.add(new THREE.AxisHelper());

    /* Add selectionBox */
    var selectionBox = new THREE.BoxHelper();
    selectionBox.material.color.setHex( 0xffff00 );
    selectionBox.material.transparent = true;
    selectionBox.update( object );
    object.add( selectionBox );

  }

  /* TODO: Set a GridHelper for the scene */

};

THREE.utils.disableDebug = function( object ) {

  if ( typeof object === 'undefined' ) {
    throw new Error("No argument supplied");
  }

  if ( object instanceof THREE.Scene ) {

    object.children.forEach( function(child) {
      if ( child instanceof THREE.Mesh ) {
        THREE.utils.disableDebug( child );
      }

    });
  }

  if ( object instanceof THREE.Mesh ) {
    /* forEach() bug here */
    for (var i = object.children.length - 1; i >= 0; i--) {
      child = object.children[i];
      if ( child instanceof THREE.AxisHelper || child instanceof THREE.BoxHelper ) {
        object.remove(child);
      }
    }
  }

};

THREE.utils.hasChildrenOfInstance = function(object, instance_name) {
  var bool = false;
  object.children.forEach( function( child ) {
    if ( child instanceof instance_name ) {
      bool = true;
    }
  });
  return bool;
};