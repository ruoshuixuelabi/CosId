package me.ahoo.cosid.snowflake;

import lombok.extern.slf4j.Slf4j;
import me.ahoo.cosid.CosIdException;
import me.ahoo.cosid.snowflake.exception.ClockTooManyBackwardsException;

import java.util.concurrent.TimeUnit;

/**
 * @author ahoo wang
 */
@Slf4j
public class DefaultClockBackwardsSynchronizer implements ClockBackwardsSynchronizer {
    public static final int DEFAULT_SPIN_THRESHOLD = 10;
    public static final int DEFAULT_BROKEN_THRESHOLD = 2000;

    private final int spinThreshold;
    private final int brokenThreshold;

    public DefaultClockBackwardsSynchronizer() {
        this(DEFAULT_SPIN_THRESHOLD, DEFAULT_BROKEN_THRESHOLD);
    }

    public DefaultClockBackwardsSynchronizer(int spinThreshold, int brokenThreshold) {
        this.spinThreshold = spinThreshold;
        this.brokenThreshold = brokenThreshold;
    }

    @Override
    public void sync(long lastTimestamp) throws InterruptedException, ClockTooManyBackwardsException {
        long backwardsStamp = ClockBackwardsSynchronizer.getBackwardsTimeStamp(lastTimestamp);
        if (backwardsStamp <= 0) {
            return;
        }
        if (log.isWarnEnabled()) {
            log.warn("sync - backwardsStamp:[{}] - lastStamp:[{}].", backwardsStamp, lastTimestamp);
        }

        if (backwardsStamp <= spinThreshold) {
            while ((ClockBackwardsSynchronizer.getBackwardsTimeStamp(lastTimestamp)) > 0) {
                /**
                 * Spin until it catches the clock back
                 */
            }
            return;
        }

        if (backwardsStamp > brokenThreshold) {
            throw new ClockTooManyBackwardsException(lastTimestamp, System.currentTimeMillis(), brokenThreshold);
        }

        TimeUnit.MILLISECONDS.sleep(backwardsStamp);
    }

    @Override
    public void syncUninterruptibly(long lastTimestamp) throws ClockTooManyBackwardsException {
        try {
            sync(lastTimestamp);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CosIdException(e);
        }
    }
}
