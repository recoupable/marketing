package recoupable

import "context"

// AccountIdentity is the documented successful GET /api/accounts/id response.
type AccountIdentity struct {
	Status    string `json:"status"`
	AccountID string `json:"accountId"`
}

// GetAccountID identifies the account associated with the supplied credentials.
func (c *Client) GetAccountID(ctx context.Context) (AccountIdentity, error) {
	var result AccountIdentity
	err := c.Request(ctx, "GET", "/api/accounts/id", nil, nil, &result)
	return result, err
}
