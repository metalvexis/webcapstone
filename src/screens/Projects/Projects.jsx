import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import SideNav from 'components/common/SideNav/SideNav.jsx';


import { Container, Col, Row } from 'reactstrap';

import './Projects.scss';

function Projects(props) {  
  return (
    <div className="ProjectsScreen">
      <Col>
        <Row>
          <h2>Projects</h2>
        </Row>
        <Row>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, metus vitae scelerisque fermentum, dui enim fermentum diam, ullamcorper dignissim nunc nisi at lectus. Vestibulum pellentesque lorem ac nisl porta pretium. Maecenas euismod orci quis sodales eleifend. Praesent magna metus, ultricies sit amet vehicula eget, lobortis non elit. Sed ac est risus. Aenean magna ligula, dapibus vitae iaculis sit amet, laoreet vel arcu. Vestibulum in congue massa. Nullam luctus dolor vitae volutpat fermentum. Donec vitae lorem vitae erat euismod suscipit. Vestibulum sed imperdiet turpis, a varius arcu. Sed efficitur malesuada tellus, nec tincidunt justo malesuada sit amet. Cras vitae imperdiet libero, vel tristique sem. Pellentesque sagittis, felis eget bibendum volutpat, massa nulla condimentum velit, quis rutrum nulla diam non sapien. Fusce tincidunt luctus dui, ac eleifend sapien eleifend ut. Integer dignissim odio nec leo viverra feugiat vitae et magna. Phasellus a tempus tellus.Fusce finibus porttitor ultrices. In at libero id augue mattis mollis id a orci. Ut at odio semper, tempus ipsum et, finibus mi. Donec ut ligula quis nibh ornare rhoncus. Donec finibus auctor est vitae malesuada. Nullam placerat consectetur libero, eu molestie leo efficitur et. Mauris iaculis massa sapien, eu mollis tortor mattis et.Mauris at quam dictum, fringilla mi non, dictum libero. Aliquam ultricies, arcu eget dictum ornare, est erat ornare erat, vel cursus erat neque ac lorem. Ut tincidunt lacus non mi mattis vehicula. Mauris auctor nec urna a semper. Fusce quis pharetra ante. Maecenas non sollicitudin elit. Fusce suscipit congue suscipit. Suspendisse non diam molestie, rhoncus ipsum sagittis, sodales tortor. Quisque bibendum aliquet orci eu tristique. Nunc a eros eu leo tincidunt consectetur. Suspendisse porttitor enim ut lectus aliquam, vitae accumsan ex sodales. Mauris felis ex, pulvinar id quam in, porta mollis nulla. Maecenas molestie risus consectetur neque faucibus bibendum.Proin sit amet interdum nibh. Donec lobortis, turpis non consequat convallis, diam arcu luctus odio, ac porta mi massa vitae velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum est quis sapien pretium, nec aliquet quam pellentesque. Fusce luctus nisi sed orci tempor accumsan. Nunc malesuada efficitur ligula non iaculis. Integer ut nisl et velit bibendum gravida. Donec posuere elementum elit eget tempor. Donec accumsan ante velit, at molestie justo lacinia at. Mauris ligula nisl, sagittis ut aliquam sed, pretium sit amet turpis. Sed a turpis quam. Vestibulum vehicula quam nec leo malesuada, nec vehicula massa aliquam.Fusce mattis neque quis bibendum eleifend. Praesent eget dui nec lorem tempus feugiat. Donec magna mauris, efficitur sit amet gravida volutpat, facilisis eget nunc. Donec convallis a orci et dapibus. Aliquam commodo lorem ut quam sodales, ac pellentesque nulla tincidunt. Cras efficitur elementum vehicula. Vivamus nibh augue, hendrerit vitae arcu et, pretium gravida urna. Cras cursus justo eget lectus luctus pellentesque. Aenean auctor ultricies mi, a suscipit nunc pretium aliquet. Quisque lacinia dolor eget justo rhoncus, nec mollis turpis pharetra. Mauris consequat ac metus non feugiat. Praesent pellentesque nisl nec malesuada imperdiet. Nulla lectus tellus, bibendum ac urna sit amet, scelerisque pretium erat. Integer dignissim magna sapien, et gravida dui posuere eget.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, metus vitae scelerisque fermentum, dui enim fermentum diam, ullamcorper dignissim nunc nisi at lectus. Vestibulum pellentesque lorem ac nisl porta pretium. Maecenas euismod orci quis sodales eleifend. Praesent magna metus, ultricies sit amet vehicula eget, lobortis non elit. Sed ac est risus. Aenean magna ligula, dapibus vitae iaculis sit amet, laoreet vel arcu. Vestibulum in congue massa. Nullam luctus dolor vitae volutpat fermentum. Donec vitae lorem vitae erat euismod suscipit. Vestibulum sed imperdiet turpis, a varius arcu. Sed efficitur malesuada tellus, nec tincidunt justo malesuada sit amet. Cras vitae imperdiet libero, vel tristique sem. Pellentesque sagittis, felis eget bibendum volutpat, massa nulla condimentum velit, quis rutrum nulla diam non sapien. Fusce tincidunt luctus dui, ac eleifend sapien eleifend ut. Integer dignissim odio nec leo viverra feugiat vitae et magna. Phasellus a tempus tellus.Fusce finibus porttitor ultrices. In at libero id augue mattis mollis id a orci. Ut at odio semper, tempus ipsum et, finibus mi. Donec ut ligula quis nibh ornare rhoncus. Donec finibus auctor est vitae malesuada. Nullam placerat consectetur libero, eu molestie leo efficitur et. Mauris iaculis massa sapien, eu mollis tortor mattis et.Mauris at quam dictum, fringilla mi non, dictum libero. Aliquam ultricies, arcu eget dictum ornare, est erat ornare erat, vel cursus erat neque ac lorem. Ut tincidunt lacus non mi mattis vehicula. Mauris auctor nec urna a semper. Fusce quis pharetra ante. Maecenas non sollicitudin elit. Fusce suscipit congue suscipit. Suspendisse non diam molestie, rhoncus ipsum sagittis, sodales tortor. Quisque bibendum aliquet orci eu tristique. Nunc a eros eu leo tincidunt consectetur. Suspendisse porttitor enim ut lectus aliquam, vitae accumsan ex sodales. Mauris felis ex, pulvinar id quam in, porta mollis nulla. Maecenas molestie risus consectetur neque faucibus bibendum.Proin sit amet interdum nibh. Donec lobortis, turpis non consequat convallis, diam arcu luctus odio, ac porta mi massa vitae velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum est quis sapien pretium, nec aliquet quam pellentesque. Fusce luctus nisi sed orci tempor accumsan. Nunc malesuada efficitur ligula non iaculis. Integer ut nisl et velit bibendum gravida. Donec posuere elementum elit eget tempor. Donec accumsan ante velit, at molestie justo lacinia at. Mauris ligula nisl, sagittis ut aliquam sed, pretium sit amet turpis. Sed a turpis quam. Vestibulum vehicula quam nec leo malesuada, nec vehicula massa aliquam.Fusce mattis neque quis bibendum eleifend. Praesent eget dui nec lorem tempus feugiat. Donec magna mauris, efficitur sit amet gravida volutpat, facilisis eget nunc. Donec convallis a orci et dapibus. Aliquam commodo lorem ut quam sodales, ac pellentesque nulla tincidunt. Cras efficitur elementum vehicula. Vivamus nibh augue, hendrerit vitae arcu et, pretium gravida urna. Cras cursus justo eget lectus luctus pellentesque. Aenean auctor ultricies mi, a suscipit nunc pretium aliquet. Quisque lacinia dolor eget justo rhoncus, nec mollis turpis pharetra. Mauris consequat ac metus non feugiat. Praesent pellentesque nisl nec malesuada imperdiet. Nulla lectus tellus, bibendum ac urna sit amet, scelerisque pretium erat. Integer dignissim magna sapien, et gravida dui posuere eget.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, metus vitae scelerisque fermentum, dui enim fermentum diam, ullamcorper dignissim nunc nisi at lectus. Vestibulum pellentesque lorem ac nisl porta pretium. Maecenas euismod orci quis sodales eleifend. Praesent magna metus, ultricies sit amet vehicula eget, lobortis non elit. Sed ac est risus. Aenean magna ligula, dapibus vitae iaculis sit amet, laoreet vel arcu. Vestibulum in congue massa. Nullam luctus dolor vitae volutpat fermentum. Donec vitae lorem vitae erat euismod suscipit. Vestibulum sed imperdiet turpis, a varius arcu. Sed efficitur malesuada tellus, nec tincidunt justo malesuada sit amet. Cras vitae imperdiet libero, vel tristique sem. Pellentesque sagittis, felis eget bibendum volutpat, massa nulla condimentum velit, quis rutrum nulla diam non sapien. Fusce tincidunt luctus dui, ac eleifend sapien eleifend ut. Integer dignissim odio nec leo viverra feugiat vitae et magna. Phasellus a tempus tellus.Fusce finibus porttitor ultrices. In at libero id augue mattis mollis id a orci. Ut at odio semper, tempus ipsum et, finibus mi. Donec ut ligula quis nibh ornare rhoncus. Donec finibus auctor est vitae malesuada. Nullam placerat consectetur libero, eu molestie leo efficitur et. Mauris iaculis massa sapien, eu mollis tortor mattis et.Mauris at quam dictum, fringilla mi non, dictum libero. Aliquam ultricies, arcu eget dictum ornare, est erat ornare erat, vel cursus erat neque ac lorem. Ut tincidunt lacus non mi mattis vehicula. Mauris auctor nec urna a semper. Fusce quis pharetra ante. Maecenas non sollicitudin elit. Fusce suscipit congue suscipit. Suspendisse non diam molestie, rhoncus ipsum sagittis, sodales tortor. Quisque bibendum aliquet orci eu tristique. Nunc a eros eu leo tincidunt consectetur. Suspendisse porttitor enim ut lectus aliquam, vitae accumsan ex sodales. Mauris felis ex, pulvinar id quam in, porta mollis nulla. Maecenas molestie risus consectetur neque faucibus bibendum.Proin sit amet interdum nibh. Donec lobortis, turpis non consequat convallis, diam arcu luctus odio, ac porta mi massa vitae velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum est quis sapien pretium, nec aliquet quam pellentesque. Fusce luctus nisi sed orci tempor accumsan. Nunc malesuada efficitur ligula non iaculis. Integer ut nisl et velit bibendum gravida. Donec posuere elementum elit eget tempor. Donec accumsan ante velit, at molestie justo lacinia at. Mauris ligula nisl, sagittis ut aliquam sed, pretium sit amet turpis. Sed a turpis quam. Vestibulum vehicula quam nec leo malesuada, nec vehicula massa aliquam.Fusce mattis neque quis bibendum eleifend. Praesent eget dui nec lorem tempus feugiat. Donec magna mauris, efficitur sit amet gravida volutpat, facilisis eget nunc. Donec convallis a orci et dapibus. Aliquam commodo lorem ut quam sodales, ac pellentesque nulla tincidunt. Cras efficitur elementum vehicula. Vivamus nibh augue, hendrerit vitae arcu et, pretium gravida urna. Cras cursus justo eget lectus luctus pellentesque. Aenean auctor ultricies mi, a suscipit nunc pretium aliquet. Quisque lacinia dolor eget justo rhoncus, nec mollis turpis pharetra. Mauris consequat ac metus non feugiat. Praesent pellentesque nisl nec malesuada imperdiet. Nulla lectus tellus, bibendum ac urna sit amet, scelerisque pretium erat. Integer dignissim magna sapien, et gravida dui posuere eget.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, metus vitae scelerisque fermentum, dui enim fermentum diam, ullamcorper dignissim nunc nisi at lectus. Vestibulum pellentesque lorem ac nisl porta pretium. Maecenas euismod orci quis sodales eleifend. Praesent magna metus, ultricies sit amet vehicula eget, lobortis non elit. Sed ac est risus. Aenean magna ligula, dapibus vitae iaculis sit amet, laoreet vel arcu. Vestibulum in congue massa. Nullam luctus dolor vitae volutpat fermentum. Donec vitae lorem vitae erat euismod suscipit. Vestibulum sed imperdiet turpis, a varius arcu. Sed efficitur malesuada tellus, nec tincidunt justo malesuada sit amet. Cras vitae imperdiet libero, vel tristique sem. Pellentesque sagittis, felis eget bibendum volutpat, massa nulla condimentum velit, quis rutrum nulla diam non sapien. Fusce tincidunt luctus dui, ac eleifend sapien eleifend ut. Integer dignissim odio nec leo viverra feugiat vitae et magna. Phasellus a tempus tellus.Fusce finibus porttitor ultrices. In at libero id augue mattis mollis id a orci. Ut at odio semper, tempus ipsum et, finibus mi. Donec ut ligula quis nibh ornare rhoncus. Donec finibus auctor est vitae malesuada. Nullam placerat consectetur libero, eu molestie leo efficitur et. Mauris iaculis massa sapien, eu mollis tortor mattis et.Mauris at quam dictum, fringilla mi non, dictum libero. Aliquam ultricies, arcu eget dictum ornare, est erat ornare erat, vel cursus erat neque ac lorem. Ut tincidunt lacus non mi mattis vehicula. Mauris auctor nec urna a semper. Fusce quis pharetra ante. Maecenas non sollicitudin elit. Fusce suscipit congue suscipit. Suspendisse non diam molestie, rhoncus ipsum sagittis, sodales tortor. Quisque bibendum aliquet orci eu tristique. Nunc a eros eu leo tincidunt consectetur. Suspendisse porttitor enim ut lectus aliquam, vitae accumsan ex sodales. Mauris felis ex, pulvinar id quam in, porta mollis nulla. Maecenas molestie risus consectetur neque faucibus bibendum.Proin sit amet interdum nibh. Donec lobortis, turpis non consequat convallis, diam arcu luctus odio, ac porta mi massa vitae velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vestibulum est quis sapien pretium, nec aliquet quam pellentesque. Fusce luctus nisi sed orci tempor accumsan. Nunc malesuada efficitur ligula non iaculis. Integer ut nisl et velit bibendum gravida. Donec posuere elementum elit eget tempor. Donec accumsan ante velit, at molestie justo lacinia at. Mauris ligula nisl, sagittis ut aliquam sed, pretium sit amet turpis. Sed a turpis quam. Vestibulum vehicula quam nec leo malesuada, nec vehicula massa aliquam.Fusce mattis neque quis bibendum eleifend. Praesent eget dui nec lorem tempus feugiat. Donec magna mauris, efficitur sit amet gravida volutpat, facilisis eget nunc. Donec convallis a orci et dapibus. Aliquam commodo lorem ut quam sodales, ac pellentesque nulla tincidunt. Cras efficitur elementum vehicula. Vivamus nibh augue, hendrerit vitae arcu et, pretium gravida urna. Cras cursus justo eget lectus luctus pellentesque. Aenean auctor ultricies mi, a suscipit nunc pretium aliquet. Quisque lacinia dolor eget justo rhoncus, nec mollis turpis pharetra. Mauris consequat ac metus non feugiat. Praesent pellentesque nisl nec malesuada imperdiet. Nulla lectus tellus, bibendum ac urna sit amet, scelerisque pretium erat. Integer dignissim magna sapien, et gravida dui posuere eget.</p>
        </Row>
      </Col>
    </div>
  );
}

export default withAuthContext(Projects);
