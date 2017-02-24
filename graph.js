




var line_shorten = function(a, b, d, arrow) {
   var dx = b[0] - a[0];
   var dy = b[1] - a[1];
   var dist = Math.sqrt(dx*dx + dy*dy);
   var start_ratio = d / dist;
   var end_ratio = (d + arrow) / dist;

   var x1 = dx * start_ratio + a[0];
   var y1 = dy * start_ratio + a[1];

   var x2 = dx - dx*end_ratio + a[0];
   var y2 = dy - dy*end_ratio + a[1];

   return [[x1, y1], [x2, y2]];
 }


var draw_edge_hovers = function(svg, edges, layout, node_radius) {
	// Create edge hovers - shapes that go over the edges to allow a wider selection box
	var edge_hovers = svg.selectAll('line.edge-hover')
	    .data(edges)
	    .enter()
	    .append('line');

	edge_hovers.attr('class', 'edge-hover')
	    .attr('x1', function(d, i) {
	        var n1 = layout[d[0]];
	        var n2 = layout[d[1]];
	        pos = line_shorten(n1, n2, node_radius, 15);
	        return pos[0][0];
	    })
	    .attr('y1', function(d, i) {
	        var n1 = layout[d[0]];
	        var n2 = layout[d[1]];
	        pos = line_shorten(n1, n2, node_radius, 15);
	        return pos[0][1];
	    })
	    .attr('x2', function(d, i) {
	        var n1 = layout[d[0]];
	        var n2 = layout[d[1]];
	        pos = line_shorten(n1, n2, node_radius, 15);
	        return pos[1][0];
	    })
	    .attr('y2', function(d, i) {
	        var n1 = layout[d[0]];
	        var n2 = layout[d[1]];
	        pos = line_shorten(n1, n2, node_radius, 15);
	        return pos[1][1];
	    })
	    .attr('stroke', 'red')
	    .attr('stroke-width', 25)
	    .attr('stroke-opacity', 0)
	    .append('title')
	    .text(function(d, i) {
	        return 'Edge = (' + d[0] + ', ' + d[1] + ')';
	    });
}


var draw_edges = function(svg, edges, layout, node_radius) {
	// Define arrow endings for edges
	var arrowHead = d3.select('svg')
	    .append('marker')
	    .attr('id', 'arrow-head')
	    .attr('orient', 'auto')
	    .attr('refX', 0.1)
	    .attr('refY', 2)
	    .attr('markerWidth', 4)
	    .attr('markerHeight', 4)


	arrowHead.append('path')
	    .attr('d', 'M 0 0 V 4 L 4 2 Z')
	    .attr('fill', 'black')

	// Create Edges 
	var edges = svg.selectAll('line.edge')
	    .data(edges)
	    .enter()
	    .append('line');

	edges.attr('class', 'edge')
	    .attr('x1', function(d, i) {
	        var n1 = layout[d[0]];
	        var n2 = layout[d[1]];
	        pos = line_shorten(n1, n2, node_radius, 15);
	        return pos[0][0];
	    })
	    .attr('y1', function(d, i) {
	        var n1 = layout[d[0]];
	        var n2 = layout[d[1]];
	        pos = line_shorten(n1, n2, node_radius, 15);
	        return pos[0][1];
	    })
	    .attr('x2', function(d, i) {
	        var n1 = layout[d[0]];
	        var n2 = layout[d[1]];
	        pos = line_shorten(n1, n2, node_radius, 15);
	        return pos[1][0];
	    })
	    .attr('y2', function(d, i) {
	        var n1 = layout[d[0]];
	        var n2 = layout[d[1]];
	        pos = line_shorten(n1, n2, node_radius, 15);
	        return pos[1][1];
	    })
	    .attr('stroke', 'black')
	    .attr('stroke-width', 4)
	    .attr('marker-end', 'url(#arrow-head)')
	    .append('title')
	    .text(function(d, i) {
	        return 'Edge = (' + d[0] + ', ' + d[1] + ')';
	    });
}

var draw_nodes = function(svg, node_lst, layout, node_radius) {
	// Create nodes
	var nodes = svg.selectAll('circle')
	    .data(node_lst)
	    .enter()
	    .append('circle')
	    .attr('class', 'node');

	nodes.attr('cx', function(d, i) {
	        return layout[i][0];
	    })
	    .attr('cy', function(d, i) {
	        return layout[i][1];
	    })
	    .attr('r', node_radius)
	    .attr('fill', 'teal')
	    .append('title')
	    .text(function(d, i) {
	        return 'Node ' + d;
	    });
}

var draw_graph = function(svg, node_lst, edges, layout, node_radius) {
	draw_edge_hovers(svg, edges, layout, node_radius);
	draw_edges(svg, edges, layout, node_radius);
	draw_nodes(svg, node_lst, layout, node_radius);
}