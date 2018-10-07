import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../src/App';
import Home from '../src/components/Home';
import renderer from 'react-test-renderer';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';
import { MemoryRouter } from 'react-router-dom';
import Fentity from '../src/components/Fentity';


configure({ adapter: new Adapter() });

it('Application should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Morgana page should have a link to Merlin page', () => {
    const wrapper = render(
    <MemoryRouter initialEntries={['/directory/wizards/Morgana Le Fay']} >
        <App />
    </MemoryRouter>);
    let miniDiv = wrapper.find('.other').first();
    let linkElement = miniDiv.find('a').first();
    expect(linkElement.prop('href').toLowerCase()).toEqual('/directory/wizards/merlin');
    
});




