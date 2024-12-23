-- Migration number: 0003    2024-12-23T17:29:51.921Z
DROP TABLE IF EXISTS user_subscriptions;
CREATE TABLE user_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subscription_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'cancelled', 'expired')),
    subscription_starts_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subscription_ends_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE RESTRICT
);

-- Create index for faster queries
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_subscription_id ON user_subscriptions(subscription_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_ends_at ON user_subscriptions(subscription_ends_at);

-- Create trigger for updated_at
CREATE TRIGGER update_user_subscriptions_updated_at 
    AFTER UPDATE ON user_subscriptions
    BEGIN
        UPDATE user_subscriptions 
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.id;
    END;

-- Prevent duplicate active subscriptions for the same user
CREATE UNIQUE INDEX idx_unique_active_subscription 
ON user_subscriptions(user_id) 
WHERE status = 'active';
