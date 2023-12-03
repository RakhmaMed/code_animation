import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Line, Node, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, useDuration} from '@motion-canvas/core/lib/utils';
import { waitUntil, waitFor } from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  const textStyle = {
    fontWeight: 700,
    fontSize: 56,
    offsetY: -1,
    padding: 20,
    cache: true,
    fontFamily: 'JetBrains Mono',
  };

  const coroutines_txt = createRef<Txt>();
  const task_txt = createRef<Txt>();
  const generator_txt = createRef<Txt>();

  view.add(
    <>
      <Txt
        ref={coroutines_txt}
        position={[0, -400]}
        text={"Coroutine"}
        fill={'#ff6470'}
        opacity={0}
        {...textStyle}
        fontSize={70}
      />
    </>,
  );

  view.add(
    <Layout direction={'row'} gap={40} layout>
      <Txt
        ref={task_txt}
        text={"Task"}
        fill={'#ff6470'}
        opacity={0}
        {...textStyle}
      />
      <Txt
        ref={generator_txt}
        text={"Generator"}
        fill={'#ff6470'}
        opacity={0}
        {...textStyle}
      />
    </Layout>
  )
  
  yield* coroutines_txt().opacity(1, 1);
  yield * waitUntil('event1');
  yield* task_txt().opacity(1, 1);
  yield * waitUntil('event2');
  yield* generator_txt().opacity(1, 1);
  yield * waitUntil('event3');
  yield* task_txt().text('Таска', 1).wait(useDuration("event4")).to("Task", 1);
});